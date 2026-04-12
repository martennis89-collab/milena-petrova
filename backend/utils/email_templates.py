# Email templates for booking confirmations and cancellations

def get_confirmation_email_html(name: str, event_type: str, start_time: str, price: str) -> str:
    """
    Generate confirmation email HTML for new bookings.
    """
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #F5F1EB;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F1EB; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #8C7A6B 0%, #BFAE9F 100%); padding: 40px 30px; text-align: center;">
                                <h1 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: 400; font-family: 'Georgia', serif;">
                                    Потвърждение за резервация
                                </h1>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <p style="margin: 0 0 20px; color: #2C2C2C; font-size: 16px; line-height: 1.6;">
                                    Здравей <strong>{name}</strong>,
                                </p>
                                
                                <p style="margin: 0 0 30px; color: #4A4A4A; font-size: 16px; line-height: 1.6;">
                                    Благодаря ти, че запази час! Радвам се да се срещнем и да работим заедно.
                                </p>
                                
                                <!-- Booking Details Box -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F1EB; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                                    <tr>
                                        <td>
                                            <h2 style="margin: 0 0 15px; color: #8C7A6B; font-size: 18px; font-weight: 600;">
                                                Детайли на резервацията:
                                            </h2>
                                            
                                            <table width="100%" cellpadding="8" cellspacing="0">
                                                <tr>
                                                    <td style="color: #4A4A4A; font-size: 14px; padding: 8px 0;">
                                                        <strong style="color: #2C2C2C;">Тип:</strong>
                                                    </td>
                                                    <td style="color: #4A4A4A; font-size: 14px; text-align: right; padding: 8px 0;">
                                                        {event_type}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="color: #4A4A4A; font-size: 14px; padding: 8px 0;">
                                                        <strong style="color: #2C2C2C;">Дата и час:</strong>
                                                    </td>
                                                    <td style="color: #4A4A4A; font-size: 14px; text-align: right; padding: 8px 0;">
                                                        {start_time}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="color: #4A4A4A; font-size: 14px; padding: 8px 0;">
                                                        <strong style="color: #2C2C2C;">Цена:</strong>
                                                    </td>
                                                    <td style="color: #8C7A6B; font-size: 16px; font-weight: 600; text-align: right; padding: 8px 0;">
                                                        €{price}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                
                                <!-- Important Info -->
                                <div style="background-color: #FFF9E6; border-left: 4px solid #8C7A6B; padding: 15px; margin-bottom: 30px; border-radius: 4px;">
                                    <p style="margin: 0; color: #4A4A4A; font-size: 14px; line-height: 1.6;">
                                        <strong style="color: #2C2C2C;">Важно:</strong> Google Meet линкът ще получиш в отделен имейл от Calendly.
                                    </p>
                                </div>
                                
                                <p style="margin: 0 0 20px; color: #4A4A4A; font-size: 16px; line-height: 1.6;">
                                    Ако имаш въпроси или искаш да промениш часа, можеш да ми пишеш на 
                                    <a href="mailto:kontakt@milenapetrova.bg" style="color: #8C7A6B; text-decoration: none;">kontakt@milenapetrova.bg</a>
                                </p>
                                
                                <p style="margin: 0; color: #4A4A4A; font-size: 16px; line-height: 1.6;">
                                    До скоро!<br>
                                    <strong style="color: #2C2C2C;">Милена</strong>
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #F5F1EB; padding: 30px; text-align: center; border-top: 1px solid #D8CFC4;">
                                <p style="margin: 0 0 10px; color: #8C7A6B; font-size: 14px;">
                                    milenapetrova.bg
                                </p>
                                <p style="margin: 0; color: #BFAE9F; font-size: 12px;">
                                    Не всичко, което носиш, е твое.
                                </p>
                            </td>
                        </tr>
                        
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """


def get_cancellation_email_html(name: str, event_type: str, start_time: str) -> str:
    """
    Generate cancellation email HTML for canceled bookings.
    """
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #F5F1EB;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F1EB; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #8C7A6B 0%, #BFAE9F 100%); padding: 40px 30px; text-align: center;">
                                <h1 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: 400; font-family: 'Georgia', serif;">
                                    Отменена резервация
                                </h1>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <p style="margin: 0 0 20px; color: #2C2C2C; font-size: 16px; line-height: 1.6;">
                                    Здравей <strong>{name}</strong>,
                                </p>
                                
                                <p style="margin: 0 0 30px; color: #4A4A4A; font-size: 16px; line-height: 1.6;">
                                    Твоята резервация беше отменена успешно.
                                </p>
                                
                                <!-- Cancellation Details Box -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FFF5F5; border-radius: 8px; padding: 20px; margin-bottom: 30px; border: 1px solid #FFE0E0;">
                                    <tr>
                                        <td>
                                            <h2 style="margin: 0 0 15px; color: #D84315; font-size: 18px; font-weight: 600;">
                                                Отменена резервация:
                                            </h2>
                                            
                                            <table width="100%" cellpadding="8" cellspacing="0">
                                                <tr>
                                                    <td style="color: #4A4A4A; font-size: 14px; padding: 8px 0;">
                                                        <strong style="color: #2C2C2C;">Тип:</strong>
                                                    </td>
                                                    <td style="color: #4A4A4A; font-size: 14px; text-align: right; padding: 8px 0;">
                                                        {event_type}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="color: #4A4A4A; font-size: 14px; padding: 8px 0;">
                                                        <strong style="color: #2C2C2C;">Дата и час:</strong>
                                                    </td>
                                                    <td style="color: #4A4A4A; font-size: 14px; text-align: right; padding: 8px 0;">
                                                        {start_time}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                
                                <p style="margin: 0 0 20px; color: #4A4A4A; font-size: 16px; line-height: 1.6;">
                                    Ако искаш да запазиш друг час, можеш да направиш това на 
                                    <a href="https://guided-sessions-2.preview.emergentagent.com/book" style="color: #8C7A6B; text-decoration: none;">milenapetrova.bg/book</a>
                                </p>
                                
                                <p style="margin: 0 0 20px; color: #4A4A4A; font-size: 16px; line-height: 1.6;">
                                    Ако имаш въпроси, пиши ми на 
                                    <a href="mailto:kontakt@milenapetrova.bg" style="color: #8C7A6B; text-decoration: none;">kontakt@milenapetrova.bg</a>
                                </p>
                                
                                <p style="margin: 0; color: #4A4A4A; font-size: 16px; line-height: 1.6;">
                                    Поздрави,<br>
                                    <strong style="color: #2C2C2C;">Милена</strong>
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #F5F1EB; padding: 30px; text-align: center; border-top: 1px solid #D8CFC4;">
                                <p style="margin: 0 0 10px; color: #8C7A6B; font-size: 14px;">
                                    milenapetrova.bg
                                </p>
                                <p style="margin: 0; color: #BFAE9F; font-size: 12px;">
                                    Не всичко, което носиш, е твое.
                                </p>
                            </td>
                        </tr>
                        
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """
