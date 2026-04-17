import Voice from '@react-native-voice/voice';
import { Platform } from 'react-native';
import { NativeModules } from 'react-native';

const { TextToSpeech } = NativeModules;

class VoiceService {
    constructor() {
        this.isListening = false;
        this.onSpeechResultsCallback = null;
        this.onSpeechErrorCallback = null;
        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
        Voice.onSpeechResults = this.onSpeechResults.bind(this);
        Voice.onSpeechError = this.onSpeechError.bind(this);
    }

    onSpeechStart() {
        this.isListening = true;
        console.log('Voice recognition started');
    }

    onSpeechEnd() {
        this.isListening = false;
        console.log('Voice recognition ended');
    }

    onSpeechResults(event) {
        const results = event.value;
        if (results && results.length > 0) {
            const recognizedText = results[0];
            if (this.onSpeechResultsCallback) {
                this.onSpeechResultsCallback(recognizedText);
            }
        }
    }

    onSpeechError(event) {
        console.error('Voice recognition error:', event.error);
        if (this.onSpeechErrorCallback) {
            this.onSpeechErrorCallback(event.error);
        }
    }

    startListening(language = 'en-US') {
        if (!this.isListening) {
            Voice.start(language);
        }
    }

    stopListening() {
        if (this.isListening) {
            Voice.stop();
        }
    }

    setOnSpeechResults(callback) {
        this.onSpeechResultsCallback = callback;
    }

    setOnSpeechError(callback) {
        this.onSpeechErrorCallback = callback;
    }

    async speak(text) {
        try {
            await TextToSpeech.speak({
                text: text,
                language: 'en-US',
                rate: 1.0,
            });
            console.log('Text-to-speech started');
        } catch (error) {
            console.error('Error in text-to-speech:', error);
        }
    }

    destroy() {
        Voice.destroy();
    }
}

export default new VoiceService();