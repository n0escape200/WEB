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

@Injectable()
export class WhatsappService {
  private readonly accessToken =
    'EAANlph9n61QBOZByzz23le2Wz8K5Q2naZBoLqlmu9W3obJr5tBc97z3BdbHfapFRaotSKAGjoJA9L1MxBhuoNHf98oUq0uzcIZBVIg00JyZBA8qPiwWa8YZAt78Q8jrnMY1d2F3IcZBqUIxDUwqMSusamlC2RQoJzpBrW8oxGEGxhcAfs8JTaSc4WcNz7vBBmNglh1LLUZBvngpRWHBQocZD';
  token = '';
  private readonly webhookURL =
    'https://webhook.site/61e1a203-4d61-4f98-9d16-06c9e21648d3';
  async sendMessage(to: string, message: string): Promise<void> {
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
    } catch (error) {
      console.error(
        'Error sending message:',
        error.response ? error.response.data : error.message,
      );
      throw new Error('Could not send message');
    }
  }

  webhookVerify(@Req() req: Request, @Res() res: Response) {
    let mode = req.query['hub.mode'];
    let challange = req.query['hub.challenge'];
    let token = req.query['hub.verify_token'];

    if (mode && token) {
      if (mode == 'subscribe' && token == 'tecleanu') {
        res.status(200).send(challange);
      } else {
        res.status(400);
      }
    }
  }

  webhook(@Req() req: Request, @Res() res: Response) {
    let body = req.body;
    console.log(JSON.stringify(body, null, 2));
    const url = 'https://graph.facebook.com/v19.0/';
    if (body.object) {
      if (
        body.entry &&
        body.entry[0].changes &&
        body.entry[0].changes[0].value.message &&
        body.entry[0].changes[0].value.message[0]
      ) {
        let phone_id = body.entry[0].changes[0].value.metadata.phone_number_id;
        let from = body.entry[0].changes[0].value.messages[0].from;
        let msg_body = body.entry[0].changes[0].value.messages[0].text.body;
        const _url = url + phone_id + '/messages?access_token' + this.token;

        const data = {
          messaging_product: 'whatsapp',
          to: from,
          text: {
            body: 'webhook working',
          },
        };

        axios.post(_url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        res.status(200);
      }
    } else {
      res.status(400);
    }
  }
}
