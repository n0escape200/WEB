import {
  Injectable,
  HttpException,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';
import { text } from 'stream/consumers';
import { Message } from 'src/schemas/Messages.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MessageGateway } from 'src/gateway/gateway';

@Injectable()
export class WhatsappService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private readonly messageGateway: MessageGateway,
  ) {}
  private readonly accessToken =
    'EAANlph9n61QBOwWZAqVNM1sRAirYMWjxX5jnzkmQxrLyxNZBhXTUBveDmlZBlELsABf0ian7uiFyveLOZCyVHVSZAE5eE4tcqm1We8e45hpjB8ZBGo7cIdBabsBR3hZBmIkvLLq6ErZB48lP585Acn6orx149p8fVJ87FR3VLRZC9qpCpKBZCivMz5RR4ZAYKzVVCqXSTZAae6ZAEIc5zt7ZBuFCMZD';
  token = '';
  private readonly webhookURL =
    'https://webhook.site/61e1a203-4d61-4f98-9d16-06c9e21648d3';
  async sendMessage(
    to: string,
    message: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const url = 'https://graph.facebook.com/v19.0/267985403070008/messages';

    const data = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to,
      type: 'text',
      text: { body: message },
    };

    try {
      await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const createMessage = new this.messageModel({
        number: 267985403070008,
        message: message,
      });
      createMessage.save();

      res.sendStatus(200);
    } catch (error) {
      console.error(
        'Error sending message:',
        error.response ? error.response.data : error.message,
      );
      res.sendStatus(400);
      throw new Error('Could not send message');
    }
  }

  webhookVerify(@Req() req: Request, @Res() res: Response) {
    let mode = req.query['hub.mode'];
    let challange = req.query['hub.challenge'];
    let token = req.query['hub.verify_token'];

    if (mode && token) {
      if (mode == 'subscribe' && token == 'tecleanu') {
        res.sendStatus(200).send(challange);
      } else {
        res.sendStatus(400);
      }
    }
  }

  async webhook(@Req() req: Request, @Res() res: Response) {
    let body = req.body;
    if (body.object) {
      if (
        body.entry &&
        body.entry[0].changes &&
        body.entry[0].changes[0].value &&
        body.entry[0].changes[0].value.messages
      ) {
        let from = body.entry[0].changes[0].value.messages[0].from;
        let msg_body = body.entry[0].changes[0].value.messages[0].text.body;
        res.sendStatus(200);
        try {
          const createMessage = new this.messageModel({
            number: from,
            message: msg_body,
          });
          const msgSaved = await createMessage.save();
          console.log(msgSaved);
          this.messageGateway.sendMessage(msg_body);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      res.sendStatus(400);
    }
  }
  async getChat() {
    return this.messageModel.find().exec();
  }
}
