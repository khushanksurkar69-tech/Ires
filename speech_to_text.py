import speech_recognition as sr

# Initialize the speech recognizer
recognizer = sr.Recognizer()

def speech_to_text():
    with sr.Microphone() as source:
        print('Listening...')
        audio = recognizer.listen(source)
    try:
        text = recognizer.recognize_google(audio)
        print(f'Transcribed Text: {text}')
        return text
    except sr.UnknownValueError:
        print('Could not understand audio')
        return None
    except sr.RequestError as e:
        print(f'Error with the request: {e}')
        return None
