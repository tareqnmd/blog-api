import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(
    email: string,
    subject: string,
    template: string,
    context: Record<string, any>,
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject,
      template,
      context,
    });
  }

  async welcomeEmail(email: string, name: string) {
    await this.sendEmail(email, 'Welcome to My Blog! 🎉', 'welcome', {
      name: name,
      dashboardUrl: 'https://myblog.com/dashboard',
    });
  }
}
