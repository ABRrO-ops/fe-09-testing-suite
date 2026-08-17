import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React, { useState } from 'react';

// Composant de démonstration ChatEngine
const ChatEngine = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, input]);
    setInput('');
  };

  return (
    <div>
      <div role="log">
        {messages.map((m, idx) => (
          <p key={idx}>{m}</p>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <label htmlFor="chat-input">Votre message</label>
        <input
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={!input.trim()}>
          Envoyer
        </button>
      </form>
    </div>
  );
};

describe('Suite de tests ChatEngine', () => {
  it('Affiche le champ de saisie et le bouton désactivé par défaut', () => {
    render(<ChatEngine />);
    const input = screen.getByLabelText(/votre message/i);
    const button = screen.getByRole('button', { name: /envoyer/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('Active le bouton quand un utilisateur écrit du texte', () => {
    render(<ChatEngine />);
    const input = screen.getByLabelText(/votre message/i);
    const button = screen.getByRole('button', { name: /envoyer/i });

    fireEvent.change(input, { target: { value: 'Hello IA' } });
    expect(button).not.toBeDisabled();
  });
});