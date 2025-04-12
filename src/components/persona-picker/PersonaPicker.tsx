/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from 'react';
import { TopicChip } from '../topic-chip/TopicChip';
import './persona-picker.scss';
import { useLiveAPIContext } from '../../contexts/LiveAPIContext';
import { ThemeName } from '../theme-context/Theme';
import { useTheme } from '../theme-context/ThemeContext';

const PERSONAS: Array<{emoji: any, label: string, theme: ThemeName, persona: string}> = [
  { emoji: '⏱️', label: 'Impatient Idris', theme:'Impatient', persona: 'Idris is extremely impatient and stressed, dining at Kuriftu on a tight 45-minute lunch break. He keeps checking his watch and needs immediate attention to take his order. He requires recommendations for the quickest dishes available and would prefer the bill be brought with his food to save time. His tone is hurried, direct, and potentially curt due to his time pressure.'},
  { emoji: '😠', label: 'Angry Alem', theme:'Angry', persona: 'Alem is angry and frustrated, having waited over 30 minutes at Kuriftu just to place a drink order while multiple servers ignored him. He needs to vent his frustration about the poor service and finally place his order, demanding an explanation for the delay. His tone is loud, sharp, and accusatory due to his anger.' },
  { emoji: '🤔', label: 'Confused Chloe (Tourist)', theme:'Confused', persona: 'Chloe, a tourist visiting Kuriftu for the first time, is confused and overwhelmed by the unfamiliar Ethiopian cuisine and menu. She is curious but needs significant help understanding the dishes, recommendations for popular or traditional options, and possibly guidance on eating customs like using injera. Her tone is hesitant, polite, and inquisitive, tinged with slight anxiety.' },
  { emoji: '🎉', label: 'Celebratory Chaltu & Family', theme:'Celebratory', persona: ' Chaltu is at Kuriftu with her family, feeling happy, excited, and festive as they celebrate a graduation. They are cheerful and talkative, needing to order a large meal with various dishes to share. They might also inquire about special dessert options or celebratory requests. Their collective tone is joyful, friendly, appreciative, and understandably a bit loud due to their excitement.' },
  { emoji: '👑', label: 'Demanding Desta', theme:'Demanding', persona: 'Desta acts like a demanding VIP at Kuriftu, displaying an entitled, impatient, and critical attitude. He expects immediate preferential treatment, demanding specific seating, making custom modifications to menu items, and requiring constant attention from staff. His tone is authoritative and condescending, expecting instant compliance with his requests.' },
  { emoji: '😊', label: 'Patient Pendo', theme:'Patient', persona: ' Pendo is calm, relaxed, and patient while at Kuriftu, perhaps reading a book or waiting for a friend who is late, clearly enjoying the ambiance. She is in no rush and will politely signal when she is ready to order a drink or food. Her tone is consistently calm, polite, gentle, and understanding, even if there are minor service delays.' },
  { emoji: '😒', label: 'Frustrated Fatima', theme:'Frustrated', persona: "Fatima is annoyed and frustrated because her food at Kuriftu arrived lukewarm and is missing a side dish she ordered. She has been trying unsuccessfully to get a server's attention to resolve the issue. She needs to firmly complain and get the problem corrected promptly. Her tone is polite but strained with clear annoyance, demanding a resolution." },
  { emoji: '😟', label: 'Anxious Abenet', theme:'Anxious', persona: 'Abenet is visibly anxious and worried while looking at the Kuriftu menu due to a severe food allergy. He needs detailed information about ingredients and preparation methods, requiring confirmation directly from the kitchen to prevent cross-contamination. His tone is concerned and questioning, perhaps slightly apologetic for the trouble, while clearly emphasizing the seriousness of his dietary restriction.' },
  { emoji: '🤷‍♂️', label: 'Indecisive Iman', theme:'Indecisive', persona: 'Iman is highly indecisive and hesitant while trying to choose from the Kuriftu menu, possibly overwhelmed by the appealing options. She needs recommendations, comparisons between different dishes, and gentle guidance to finally make a decision. Her tone is hesitant and thoughtful, marked by "umms" and "ahs," many questions, and a slightly flustered demeanor.' },
  { emoji: '😖', label: 'Tech-Troubled Tesfaye', theme:'Tech-Troubled', persona: "Tesfaye is mildly frustrated and confused at Kuriftu because he's encountering issues with technology – perhaps the restaurant Wi-Fi isn't connecting, or a QR code menu/payment system isn't working on his phone. He needs assistance from staff to resolve the tech issue or provide an alternative like a physical menu or traditional payment method. His tone is puzzled and help-seeking, with a hint of annoyance directed at the malfunctioning technology." },
  { emoji: '🤨', label: 'Complaining Kedir', theme:'Complaining', persona: "Kedir seems disappointed and nitpicky at Kuriftu, finding minor faults with various aspects like the music volume, a wobbly table, or the water temperature. While ready to order, he's already in a critical mindset and needs to voice these small complaints, seeking acknowledgment or solutions. His tone tends towards whining, critical, and slightly passive-aggressive." }
];


const PersonaPicker: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const { applyTheme } = useTheme();

  const { client, connect, connected } = useLiveAPIContext();

  const handleSelection = (persona: string, theme: ThemeName) => {
    applyTheme(theme)
    setSelectedPersona(persona)
    
    // If we're streaming and have both topic & style, send to model
    if (connected && selectedPersona) {
      client.send([
        {
          text: `You are a customer with persona ${selectedPersona}. Talk to me as if you are that person 
          Don't change your style until I ask you to.`,
        },
      ]);
    }
  };

  const handleStart = async () => {
    if (selectedPersona && !connected) {
      try {
        await connect();
        // Send initial explanation
        client.send([
          {
            text: `You are a customer with persona ${selectedPersona}. 
            DO NOT EXPAIN TO ME THE MOOD, JUST TALK TO ME AS IF AM A WAITER AND YOU ARE CUSTOMER. 
            Don't change your style until I ask you to.`,
          },
        ]);
      } catch (error) {
        console.error("Failed to start streaming:", error);
      }
    }
  };

  return (
    <div className="explainer-picker">
      <div className="log">
        <img src="/kuriftu.png" alt="logo" />
      </div>
      <h1 className="title">Kuriftu Lang</h1>
      
      <div className="section">
        <h2 className="section-label">Personas</h2>
        <div className="chips-container">
          {PERSONAS.map((persona, index) => (
            <TopicChip 
              key={index} 
              {...persona} 
              isSelected={selectedPersona === persona.persona}
              onClick={() => handleSelection(persona.persona, persona.theme)}
            />
          ))}
        </div>
      </div>

      <button 
        className={`start-button ${!connected && selectedPersona ? 'enabled' : 'disabled'}`}
        onClick={handleStart}
        disabled={connected || !selectedPersona}
      >
        <span className="emoji">🔊</span> {connected ? 'Streaming...' : 'Start talking'}
      </button>
    </div>
  );
};

export default PersonaPicker; 