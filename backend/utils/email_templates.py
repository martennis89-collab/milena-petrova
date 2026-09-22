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
                                    <a href="https://milenapetrova.bg/book" style="color: #8C7A6B; text-decoration: none;">milenapetrova.bg/book</a>
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



def get_reminder_email_1_day(name: str) -> tuple[str, str]:
    """Generate 1-day reminder email"""
    
    subject = "⏰ Утре е уебинарът: Защо попадаме в отношения които ни нараняват"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #2C3E50; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #D4758C 0%, #B85C7A 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .content {{ background: #ffffff; padding: 30px; border: 1px solid #E5E7EB; }}
            .details {{ background: #FFF5F7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D4758C; }}
            .cta-button {{ display: inline-block; background: #2C3E50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 15px 0; font-weight: bold; }}
            .calendar-buttons {{ margin: 20px 0; }}
            .calendar-btn {{ display: inline-block; background: #F5F1EB; color: #2C3E50; padding: 12px 20px; text-decoration: none; border-radius: 6px; margin: 5px; border: 2px solid #D4758C; }}
            .footer {{ text-align: center; padding: 20px; color: #8C7A6B; font-size: 14px; }}
            .countdown {{ background: #2C3E50; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0; font-size: 32px;">⏰ Утре е големият ден!</h1>
            </div>
            
            <div class="content">
                <p style="font-size: 18px;">Здравейте, {name}!</p>
                
                <div class="countdown">
                    <p style="font-size: 16px; margin: 0;">Само още</p>
                    <h2 style="font-size: 48px; margin: 10px 0;">24 часа</h2>
                    <p style="margin: 0;">до началото на уебинара!</p>
                </div>
                
                <p>Напомняме ви, че утре в <strong>20:00ч</strong> започваме безплатния уебинар <strong>"Защо попадаме в отношения които ни нараняват"</strong>.</p>
                
                <div class="details">
                    <h3 style="color: #2C3E50; margin-top: 0;">📍 Детайли</h3>
                    <p><strong>Дата:</strong> Четвъртък, 16 Юли 2026</p>
                    <p><strong>Час:</strong> 20:00 - 21:00 (Българско време)</p>
                    <p><strong>Платформа:</strong> Google Meet</p>
                    
                    <p style="margin-top: 20px;"><strong>Линк за присъединяване:</strong></p>
                    <a href="https://meet.google.com/ahr-nxxi-dxb" class="cta-button">
                        Влез в уебинара
                    </a>
                </div>
                
                <h3 style="color: #2C3E50;">📅 Добавете в календара си:</h3>
                <div class="calendar-buttons">
                    <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Защо+попадаме+в+отношения+които+ни+нараняват+с+Милена+Петрова&details=Безплатен+уебинар+за+жени+в+повтарящи+се+нездравословни+връзки.+Google+Meet+линк:+https://meet.google.com/ahr-nxxi-dxb&location=https://meet.google.com/ahr-nxxi-dxb&dates=20260716T170000Z/20260716T180000Z" class="calendar-btn" target="_blank">
                        📅 Google Calendar
                    </a>
                </div>
                
                <h3 style="color: #2C3E50;">🎯 Какво ще научите:</h3>
                <ul style="color: #4A4A4A; line-height: 1.8;">
                    <li>Защо най-важният въпрос не е "Защо той се държи така?", а "Какво ме задържа?"</li>
                    <li>Невидимите модели, които ви връщат към едни и същи избори</li>
                    <li>Моментът, в който започва истинската промяна</li>
                </ul>
                
                <p style="background: #FFF5F7; padding: 15px; border-radius: 6px; border-left: 4px solid #B85C7A;">
                    💡 <strong>Съвет:</strong> Подгответе си удобно място, чаша вода и бележник. Този уебинар може да промени перспективата ви завинаги.
                </p>
                
                <p>До утре!<br>
                Милена Петрова 💝</p>
            </div>
            
            <div class="footer">
                <p>Очакваме ви на 16 Юли в 20:00ч<br>
                За въпроси: info@milenapetrova.bg</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return subject, html_content


def get_reminder_email_2_hours(name: str) -> tuple[str, str]:
    """Generate 2-hour reminder email"""
    
    subject = "🔔 Започваме след 2 часа! Подгответе се за уебинара"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #2C3E50; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #B85C7A 0%, #8C4A5E 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .content {{ background: #ffffff; padding: 30px; border: 1px solid #E5E7EB; }}
            .urgent-box {{ background: linear-gradient(135deg, #FFE8ED 0%, #FFD4DC 100%); padding: 25px; border-radius: 10px; margin: 20px 0; border: 2px solid #D4758C; text-align: center; }}
            .cta-button {{ display: inline-block; background: #D4758C; color: white; padding: 18px 40px; text-decoration: none; border-radius: 8px; margin: 15px 0; font-weight: bold; font-size: 18px; }}
            .footer {{ text-align: center; padding: 20px; color: #8C7A6B; font-size: 14px; }}
            .checklist {{ background: #F5F1EB; padding: 20px; border-radius: 8px; margin: 20px 0; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0; font-size: 36px;">🔔 Започваме скоро!</h1>
            </div>
            
            <div class="content">
                <p style="font-size: 18px;">Здравейте, {name}!</p>
                
                <div class="urgent-box">
                    <h2 style="font-size: 52px; margin: 0; color: #B85C7A;">2 часа</h2>
                    <p style="font-size: 20px; margin: 10px 0; color: #2C3E50;">до началото на уебинара!</p>
                </div>
                
                <p style="font-size: 16px;">Уебинарът <strong>"Защо попадаме в отношения които ни нараняват"</strong> започва днес в <strong>20:00ч</strong>.</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <p style="font-size: 18px; color: #2C3E50; margin-bottom: 10px;"><strong>Влезте в Google Meet:</strong></p>
                    <a href="https://meet.google.com/ahr-nxxi-dxb" class="cta-button">
                        Присъединете се сега
                    </a>
                    <p style="font-size: 14px; color: #8C7A6B; margin-top: 10px;">
                        Или копирайте линка:<br>
                        <code style="background: #F5F1EB; padding: 8px 15px; border-radius: 4px; display: inline-block; margin-top: 5px;">
                            https://meet.google.com/ahr-nxxi-dxb
                        </code>
                    </p>
                </div>
                
                <div class="checklist">
                    <h3 style="color: #2C3E50; margin-top: 0;">✅ Checklist за подготовка:</h3>
                    <ul style="color: #4A4A4A; line-height: 2;">
                        <li>Намерете тихо и спокойно място</li>
                        <li>Подгответе чаша вода или чай ☕</li>
                        <li>Вземете бележник за записки 📝</li>
                        <li>Тествайте камерата и микрофона си</li>
                        <li>Затворете отвличащи приложения</li>
                    </ul>
                </div>
                
                <p style="background: #FFF5F7; padding: 15px; border-radius: 6px; border-left: 4px solid #D4758C;">
                    💝 <strong>Напомняне:</strong> Можете да влезете в срещата 10 минути преди началото. Очакваме ви!
                </p>
                
                <p>До скоро!<br>
                Милена Петрова</p>
            </div>
            
            <div class="footer">
                <p>Начало: Днес в 20:00ч<br>
                За въпроси: info@milenapetrova.bg</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return subject, html_content


def get_reminder_email_10_minutes(name: str) -> tuple[str, str]:
    """Generate 10-minute reminder email"""
    
    subject = "🚨 ПОСЛЕДНА МИНУТА: Уебинарът започва след 10 минути!"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #2C3E50; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #8C4A5E 0%, #6B3847 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .content {{ background: #ffffff; padding: 30px; border: 1px solid #E5E7EB; }}
            .urgent-alert {{ background: linear-gradient(135deg, #FFD4DC 0%, #FFB8C5 100%); padding: 30px; border-radius: 10px; margin: 20px 0; border: 3px solid #D4758C; text-align: center; }}
            .cta-button {{ display: inline-block; background: #D4758C; color: white; padding: 20px 50px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; font-size: 20px; box-shadow: 0 4px 15px rgba(212, 117, 140, 0.4); }}
            .footer {{ text-align: center; padding: 20px; color: #8C7A6B; font-size: 14px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0; font-size: 40px;">🚨 ЗАПОЧВАМЕ СЕГА!</h1>
            </div>
            
            <div class="content">
                <p style="font-size: 18px;">Здравейте, {name}!</p>
                
                <div class="urgent-alert">
                    <h2 style="font-size: 60px; margin: 0; color: #8C4A5E; font-weight: bold;">10 MIN</h2>
                    <p style="font-size: 22px; margin: 15px 0; color: #2C3E50; font-weight: bold;">до началото!</p>
                </div>
                
                <p style="font-size: 18px; text-align: center; color: #2C3E50;">
                    Уебинарът <strong>"Защо попадаме в отношения които ни нараняват"</strong> започва ВЕДНАГА!
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <p style="font-size: 20px; color: #B85C7A; margin-bottom: 15px; font-weight: bold;">👇 Кликнете ТУК за да влезете:</p>
                    <a href="https://meet.google.com/ahr-nxxi-dxb" class="cta-button">
                        ВЛЕЗ В УЕБИНАРА СЕГА
                    </a>
                </div>
                
                <p style="background: #FFF5F7; padding: 20px; border-radius: 8px; border-left: 4px solid #D4758C; text-align: center; font-size: 16px;">
                    🎥 Вече можете да влезете в Google Meet стаята!<br>
                    Очакваме ви!
                </p>
                
                <div style="margin-top: 20px; text-align: center;">
                    <p style="font-size: 14px; color: #8C7A6B;">
                        Директен линк:<br>
                        <code style="background: #F5F1EB; padding: 10px 20px; border-radius: 4px; display: inline-block; margin-top: 5px; font-size: 13px;">
                            https://meet.google.com/ahr-nxxi-dxb
                        </code>
                    </p>
                </div>
                
                <p style="text-align: center; margin-top: 30px; font-size: 16px;">
                    До след малко!<br>
                    Милена Петрова 💝
                </p>
            </div>
            
            <div class="footer">
                <p><strong>СЕГА!</strong> Уебинарът започва в 20:00ч<br>
                Влезте в Google Meet стаята!</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return subject, html_content
