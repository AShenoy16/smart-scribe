import { useRef, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  AppBar,
  Button,
  Card,
  Divider,
  IconButton,
  Toolbar,
} from "@mui/material";
import {
  AccessTime,
  BookRounded,
  Event,
  FilePresentRounded,
  MessageRounded,
  Person,
  Upload,
} from "@mui/icons-material";
import WaveSurfer from "wavesurfer.js";
import Wave from "./wave";
import { AudioRecorder } from "react-audio-voice-recorder";
import "./App.css";
import { mockSummary } from "./mock";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { darkTheme, lightTheme } from "./theme";

export default function App() {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [fileName, setfileName] = useState("Audio File Name");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [mode, setMode] = useState<"light" | "dark">("dark"); // Manage theme mode
  const theme = useTheme(); // Access the current theme

  const handleThemeToggle = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const onReady = (ws: WaveSurfer) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && wavesurfer) {
      const objectURL = URL.createObjectURL(file);
      wavesurfer.load(objectURL); // Load the uploaded audio file into wavesurfer
      setfileName(file.name);
    }
  };

  // Trigger file input when the button is clicked
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const addAudioElement = async (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    wavesurfer?.load(url);
    setfileName("New recorded audio");
  };

  const testGetFromServer = async () => {
    fetch()
      .then((response) => {
        if (response.ok) {
          return response.json(); // Read and parse the JSON body
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data.message); // Access the "message" key in the returned JSON
      })
      .catch((error) =>
        console.error("There was a problem with the fetch operation:", error)
      );
  };

  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Box
        bgcolor="background.default"
        sx={{ minHeight: "100vh", padding: "15px" }}
      >
        {/* Header */}
        <AppBar
          position="static"
          sx={(theme) => ({
            bgcolor: theme.palette.primary.main,
            mb: "3px",
            borderRadius: "12px",
          })}
        >
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" sx={{ mr: 2 }} color="text.primary">
                Doctor's Appointment
              </Typography>
              <IconButton onClick={testGetFromServer}>Temp</IconButton>
              <Divider
                orientation="vertical"
                flexItem
                sx={(theme) => ({
                  padding: "0.75px",
                  my: 1,
                  mx: 1,
                  bgcolor: theme.palette.background.default,
                })}
              />
              <Box
                bgcolor="secondary.main"
                sx={{
                  borderRadius: 3,
                  marginLeft: 2,
                }}
              >
                <IconButton sx={{ color: "text.secondary" }}>
                  <Event />
                  <Typography variant="body2" sx={{ marginLeft: 1 }}>
                    16 Aug 2024
                  </Typography>
                </IconButton>
              </Box>
              <Box
                bgcolor="secondary.main"
                sx={{
                  borderRadius: 3,
                  marginLeft: 1,
                }}
              >
                <IconButton sx={{ color: "text.secondary" }}>
                  <AccessTime />
                  <Typography variant="body2" sx={{ marginLeft: 1 }}>
                    1 pm - 2 pm
                  </Typography>
                </IconButton>
              </Box>
              <Box
                bgcolor="secondary.main"
                sx={{
                  borderRadius: 3,
                  marginLeft: 1,
                }}
              >
                <IconButton sx={{ color: "text.secondary" }}>
                  <Person />
                  <Typography variant="body2" sx={{ marginLeft: 1 }}>
                    Jane Doe
                  </Typography>
                </IconButton>
              </Box>
            </Box>
            <IconButton onClick={handleThemeToggle} sx={{ marginLeft: "auto" }}>
              {mode === "light" ? (
                <DarkModeIcon sx={{ color: "primary.dark" }} />
              ) : (
                <LightModeIcon sx={{ color: "primary.light" }} />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box display="flex" gap="3px" height="calc(100vh - 64px - 40px)">
          {/* Left Side: Audio and Transcription */}
          <Box flex={1} display={"flex"} flexDirection={"column"}>
            {/* Audio File Section */}
            <Card
              sx={{
                bgcolor: "primary.main",
                padding: 2,
                mb: "3px",
                borderRadius: "12px",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                  color="text.primary"
                >
                  <FilePresentRounded />
                  <Typography variant="h6" noWrap maxWidth={"295px"}>
                    {fileName}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Button
                    startIcon={<Upload />}
                    onClick={handleClick}
                    variant="contained"
                    sx={{
                      backgroundColor: "secondary.main",
                      mr: 1,
                      color: "text.secondary",
                      borderRadius: 2,
                    }}
                  >
                    Upload
                    <input
                      type="file"
                      accept="audio/*"
                      ref={inputRef}
                      onChange={onFileUpload}
                      style={{ display: "none" }}
                    />
                  </Button>
                  <AudioRecorder
                    onRecordingComplete={addAudioElement}
                    audioTrackConstraints={{
                      noiseSuppression: true,
                      echoCancellation: true,
                    }}
                    onNotAllowedOrFound={(err) => console.table(err)}
                    mediaRecorderOptions={{
                      audioBitsPerSecond: 128000,
                    }}
                    downloadOnSavePress={true}
                    downloadFileExtension="wav"
                    showVisualizer={true}
                  />
                </Box>
              </Box>
              {/* Placeholder for the waveform visual */}
              <Wave
                height={200}
                waveColor={mode === "light" ? "lightblue" : "white"}
                url="src/audio/ukfinf_noi_fem_mix_9_full.wav"
                onReady={onReady}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={onPlayPause}
                  sx={{
                    backgroundColor: "text.secondary",
                    color: "primary.secondary",
                    borderRadius: 2,
                  }}
                >
                  {isPlaying ? "Pause" : "Play"}
                </Button>
              </Box>
            </Card>

            {/* Transcription Section */}
            <Card
              sx={{
                bgcolor: "primary.main",
                padding: 2,
                borderRadius: 3,
                flex: 1,
                overflow: "auto",
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <MessageRounded />
                <Typography variant="h5">Transcription</Typography>
              </Box>
              <Divider
                flexItem
                sx={{ padding: "0.25px", my: 2, bgcolor: "primary.dark" }}
              />
              {/* List of dialogues */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Person sx={{ mr: 2, color: "text.primary" }} />
                <Box>
                  <Typography variant="subtitle1" color="text.primary">
                    Doctor Joe
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    00:00 - Lorem ipsum dolor sit amet.Lorem ipsum dolor sit
                    amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit
                    amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.
                  </Typography>
                </Box>
              </Box>
              <Divider
                flexItem
                sx={{ padding: "0.2px", my: 2, bgcolor: "background.default" }}
              />
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Person sx={{ mr: 2, color: "white" }} />
                <Box>
                  <Typography variant="subtitle1" color="#DADADA">
                    Doctor Joe
                  </Typography>
                  <Typography variant="body2" color="#DADADA">
                    00:00 - Lorem ipsum dolor sit amet.Lorem ipsum dolor sit
                    amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit
                    amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.
                  </Typography>
                </Box>
              </Box>
              <Divider
                flexItem
                sx={{ padding: "0.2px", my: 2, bgcolor: "background.default" }}
              />
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Person sx={{ mr: 2, color: "white" }} />
                <Box>
                  <Typography variant="subtitle1" color="#DADADA">
                    Doctor Joe
                  </Typography>
                  <Typography variant="body2" color="#DADADA">
                    00:00 - Lorem ipsum dolor sit amet.Lorem ipsum dolor sit
                    amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit
                    amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.
                  </Typography>
                </Box>
              </Box>
              <Divider
                flexItem
                sx={{ padding: "0.2px", my: 2, bgcolor: "background.default" }}
              />
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Person sx={{ mr: 2, color: "white" }} />
                <Box>
                  <Typography variant="subtitle1" color="#DADADA">
                    Doctor Joe
                  </Typography>
                  <Typography variant="body2" color="#DADADA">
                    00:00 - Lorem ipsum dolor sit amet.Lorem ipsum dolor sit
                    amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit
                    amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.
                  </Typography>
                </Box>
              </Box>
              <Divider
                flexItem
                sx={{ padding: "0.2px", my: 2, bgcolor: "background.default" }}
              />
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Person sx={{ mr: 2, color: "white" }} />
                <Box>
                  <Typography variant="subtitle1" color="#DADADA">
                    Doctor Joe
                  </Typography>
                  <Typography variant="body2" color="#DADADA">
                    00:00 - Lorem ipsum dolor sit amet.Lorem ipsum dolor sit
                    amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit
                    amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.
                  </Typography>
                </Box>
              </Box>
              {/* Add more dialogues as necessary */}
            </Card>
          </Box>
          {/* Right Side: Summary Section */}
          <Card
            sx={{
              bgcolor: "primary.main",
              padding: 2,
              borderRadius: 3,
              flex: 1,
              overflow: "auto",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              color={"text.secondary"}
            >
              <BookRounded />
              <Typography variant="h5">Summary</Typography>
            </Box>
            <Divider
              flexItem
              sx={{ padding: "0.25px", my: 2, bgcolor: "primary.dark" }}
            />
            <Typography
              color="text.secondary"
              sx={{
                whiteSpace: "pre-line",
                overflow: "hidden",
                textOverflow: "ellipsis",
                wordBreak: "break-word",
              }}
            >
              {mockSummary}
              {/* Add more summary details */}
            </Typography>
          </Card>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
