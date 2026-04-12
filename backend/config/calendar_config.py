# Google Calendar Configuration

# Working hours configuration
WORKING_HOURS = {
    "monday": {"start": "10:00", "end": "18:00"},
    "tuesday": {"start": "10:00", "end": "18:00"},
    "wednesday": {"start": "10:00", "end": "18:00"},
    "thursday": {"start": "10:00", "end": "18:00"},
    "friday": {"start": "10:00", "end": "18:00"},
    "saturday": None,  # Not working
    "sunday": None     # Not working
}

# Session duration in minutes
SESSION_DURATION = 90  # 60-90 minutes

# Buffer between sessions in minutes
BUFFER_TIME = 15

# How many days ahead to show availability
DAYS_AHEAD = 30

# Timezone
TIMEZONE = "Europe/Sofia"  # Bulgaria timezone
