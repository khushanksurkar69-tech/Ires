// openaiService.js

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Function to get chat completions
const getChatCompletion = async (messages) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });
    return response.data.choices[0].message;
  } catch (error) {
    console.error("Error fetching chat completion:", error);
    throw error;
  }
};

// Function to convert text to speech
const textToSpeech = async (text) => {
  try {
    const response = await openai.createAudio({
      model: 'text-to-speech',
      input: text,
    });
    return response.data.audio_url; // Return the URL of the generated audio
  } catch (error) {
    console.error("Error converting text to speech:", error);
    throw error;
  }
};

module.exports = { getChatCompletion, textToSpeech };