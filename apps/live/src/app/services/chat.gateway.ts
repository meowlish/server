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

// cannot register using APP_FILTER
@UseFilters(GlobalWsExceptionFilter)
@WebSocketGateway({
	cors: {
		origin: '*',
	},
	path: '/socket.io',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server!: Server;

	private socketRoomMap = new Map<string, string>();

	handleConnection(client: Socket) {
		console.log(`Client connected: ${client.id}`);
	}

	handleDisconnect(client: Socket) {
		console.log(`Client disconnected: ${client.id}`);
	}

	@SubscribeMessage('join-room')
	async handleJoin(@MessageBody() roomId: string, @ConnectedSocket() socket: Socket) {
		const currentRoomId = this.socketRoomMap.get(socket.id);
		if (currentRoomId) throw new MethodNotAllowedException('Client has already joined a room');
		this.socketRoomMap.set(socket.id, roomId);
		await socket.join(roomId);
	}

	@SubscribeMessage('leave-room')
	async handleLeave(@MessageBody() roomId: string, @ConnectedSocket() socket: Socket) {
		const currentRoomId = this.socketRoomMap.get(socket.id);
		if (!currentRoomId) throw new MethodNotAllowedException('Client has not joined a room');
		if (currentRoomId != roomId) throw new NotFoundException(`Client is not in room ${roomId}`);
		this.socketRoomMap.delete(socket.id);
		await socket.leave(roomId);
	}

	@SubscribeMessage('chat')
	handlePing(@MessageBody() data: any): void {
		console.log(`Client sent ${data}`);
	}
}
