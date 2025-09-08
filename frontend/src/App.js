import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { io } from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Custom CSS for futuristic style

const socket = io("http://localhost:5000"); // Backend WebSocket

function App() {
  const [meetingUrl, setMeetingUrl] = useState("");
  const [notes, setNotes] = useState("Waiting for meeting...");
  const [summary, setSummary] = useState("Summary will appear here...");

  useEffect(() => {
    socket.on("update", (data) => {
      setNotes(data.notes);
      setSummary(data.summary);
    });
  }, []);

  const handleJoinMeeting = (e) => {
    e.preventDefault();
    if (!meetingUrl) return alert("Enter a meeting URL!");
    socket.emit("joinMeeting", { url: meetingUrl });
  };

  return (
    <div className="app-container">
      <Container className="text-center py-5">
        <h1 className="glow-text mb-4">🚀 AI Meeting Assistant</h1>

        <Card className="glass-card mb-4 p-4">
          <Form onSubmit={handleJoinMeeting}>
            <Form.Group className="mb-3">
              <Form.Control
                type="url"
                placeholder="Enter Zoom/Google Meet URL"
                value={meetingUrl}
                onChange={(e) => setMeetingUrl(e.target.value)}
                className="input-glow"
              />
            </Form.Group>
            <Button type="submit" className="btn-glow">
              Join Meeting
            </Button>
          </Form>
        </Card>

        <Card className="glass-card mb-4 p-4">
          <h4 className="glow-text">📌 Live Notes</h4>
          <div className="notes-box">{notes}</div>
        </Card>

        <Card className="glass-card p-4">
          <h4 className="glow-text">📝 AI Summary</h4>
          <p className="summary-box">{summary}</p>
        </Card>
      </Container>
    </div>
  );
}

export default App;
