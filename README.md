# SmartScribe - Proof of Concept

This repository contains the proof of concept for **SmartScribe**, a neural speaker diarization system. Below is the directory structure and instructions for running both the frontend and backend.

Video POC - https://drive.google.com/file/d/1i5aqygfSzeOw6fhn7LE2xYvxmy-vnRo_/view?usp=sharing

## Folder and File Structure

- **frontend/**
  - Contains all the frontend code necessary to run the website interface.

- **backend/**
  - Contains all the backend code required to run the models and expose the necessary API endpoints.
  - **ASR/**: Folder for the Automatic Speech Recognition (ASR) section (code to run ASR models).
  - **SD/**: Folder for the Speaker Diarization (SD) section (code to run SD models).
  - **main.py**: The Flask server that runs the backend.
  - **ASRSDCombined/**: Code responsible for combining the outputs of ASR and SD models.
  - **Transcription/**: Generates the transcriptions by merging ASR and SD outputs.
  - **TranscriptionSummary/**: Uses OpenAI to generate summaries of the transcriptions.

- **poc-research-env.yml**
  - Conda environment file for setting up the backend environment with the necessary dependencies.

## How to Run

### Frontend

1. Navigate to the `frontend/` directory and run the frontend
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Open localhost

### Backend

3. Navigate to the `backend/` directory and start the server
 ```bash
   cd backend
   conda env create -f poc-research-env.yml
   conda activate poc-research-env
   python main.py
   ```

## Notes ##


**The backend must be run by someone connected to the university's GPUs. Currently, this has been hardcoded to use Apollo, but the IP address can be changed as needed.**



**The frontend person must also be connected to the university’s internet, either via VPN or by being physically on campus.**


## Authors

- Steven Li
- Adi Shenoy


## Acknowledgements

We would like to acknowledge our research supervisor: 
 - [Dr Satwinder Singh](https://profiles.auckland.ac.nz/satwinder-singh)



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file, which you can find by asking Dr Satwinder Singh. 

`OPENAI_API_KEY`

