import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { Request, Response } from 'express';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('/send')
  async sendMesage(
    @Body() body: { to: string; message: string },
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const { to, message } = body;
    await this.whatsappService.sendMessage(to, message, req, res);
  }

  @Get('/webhook')
  webhookVerify(@Req() req: Request, @Res() res: Response) {
    this.whatsappService.webhookVerify(req, res);
  }

  @Post('/webhook')
  webhook(@Req() req: Request, @Res() res: Response) {
    this.whatsappService.webhook(req, res);
  }

  @Get('/getChat')
  getChat() {
    return this.whatsappService.getChat();
  }
}
