import { MethodNotAllowedException, NotFoundException, UseFilters } from '@nestjs/common';
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { GlobalWsExceptionFilter } from '@server/utils';
import { Server, Socket } from 'socket.io';
import { z } from 'zod/v4';

const UserSchema = z.object({
	sub: z.string(),
	roles: z.array(z.string()),
	permissions: z.array(z.string()),
});

type ModifiedSocket = Omit<Socket, 'data'> & { data: { user: z.infer<typeof UserSchema> } };

// cannot register using APP_FILTER
@UseFilters(GlobalWsExceptionFilter)
@WebSocketGateway({
	cors: {
		origin: '*',
	},
	namespace: 'chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server!: Server;

	private socketRoomMap = new Map<string, string>();

	handleConnection(socket: ModifiedSocket) {
		try {
			if (!socket.handshake.headers['x-user']) throw new Error('Missing x-user header');
			const userJsonString = z.string().parse(socket.handshake.headers['x-user']);
			const user = UserSchema.parse(JSON.parse(userJsonString));
			socket.data.user = user;
		} catch {
			socket.disconnect(true);
		}
	}

	handleDisconnect(socket: ModifiedSocket) {
		try {
			console.log(`Client disconnected: ${socket.id}`);
		} catch {
			socket.disconnect(true);
		}
	}

	@SubscribeMessage('join-room')
	async handleJoin(@MessageBody() roomId: string, @ConnectedSocket() socket: Socket) {
		const currentRoomId = this.socketRoomMap.get(socket.id);
		if (currentRoomId) throw new MethodNotAllowedException('Client has already joined a room');
		this.socketRoomMap.set(socket.id, roomId);
		await socket.join(roomId);
	}

	@SubscribeMessage('leave-room')
	async handleLeave(@MessageBody() roomId: string, @ConnectedSocket() socket: ModifiedSocket) {
		const currentRoomId = this.socketRoomMap.get(socket.id);
		if (!currentRoomId) throw new MethodNotAllowedException('Client has not joined a room');
		if (currentRoomId != roomId) throw new NotFoundException(`Client is not in room ${roomId}`);
		this.socketRoomMap.delete(socket.id);
		await socket.leave(roomId);
	}

	@SubscribeMessage('chat')
	handlePing(@MessageBody() data: any, @ConnectedSocket() socket: ModifiedSocket): void {
		const roomId = this.socketRoomMap.get(socket.id);
		if (!roomId) throw new NotFoundException('Client is not in a room');
		socket.to(roomId).emit('message', { ...data, user: socket.data.user });
	}
}
