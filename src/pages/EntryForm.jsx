import { useState } from 'react';
import { saveEntry } from '../utils/Data';
import EmojiSelector from '../components/EmojiSelector';
import NoteInput from '../components/NoteInput';
import ConditionalSection from '../components/ConditionalSection';
import './EntryForm.scss';

export default function EntryForm({ onBack }) {
    const today = new Date().toISOString().split('T')[0];

    // Feeling
    const [feelingEmoji, setFeelingEmoji] = useState('');
    const [feelingNote, setFeelingNote] = useState('');
    
    // Sleep
    const [sleepEmoji, setSleepEmoji] = useState('');
    const [sleepNote, setSleepNote] = useState('');
    
    // Your Day
    const [describeDay, setDescribeDay] = useState('');

    //Workout
    const [didWorkout, setDidWorkout] = useState(false);
    const [workoutType, setWorkoutType] = useState('');
    const [workoutDuration, setWorkoutDuration] = useState('');
    
    // Meditation
    const [didMeditate, setDidMeditate] = useState(false);
    const [meditationType, setMeditationType] = useState('');
    const [meditationDuration, setMeditationDuration] = useState('');

    // Medication
    const [tookMeds, setTookMeds] = useState(false);
    const [medications, setMedications] = useState('');
    const [medTime, setMedTime] = useState('');

    // Pain
    const [hadPain, setHadPain] = useState(false);
    const [painLocation, setPainLocation] = useState('');
    const [painLevel, setPainLevel] = useState('');

    // Dream
    const [hadDream, setHadDream] = useState(false);
    const [dreamType, setDreamType] = useState('');
    const [dreamNote, setDreamNote] = useState('');

    const handleSubmit = () => {
        if (!feelingEmoji || !sleepEmoji) {
            alert('Please select both mood and sleep emoji.');
            return;
        }

        const entryData = {
            feeling: { emoji: feelingEmoji, note: feelingNote },
            sleep: { emoji: sleepEmoji, note: sleepNote },
            describeDay,
            workout: didWorkout ? { type: workoutType, duration: workoutDuration } : null,
            meditation: didMeditate ? { type: meditationType, duration: meditationDuration } : null,
            medication: tookMeds ? { names: medications, time: medTime } : null,
            pain: hadPain ? { location: painLocation, level: painLevel } : null,
            dream: hadDream ? { type: dreamType, note: dreamNote } : null
        };

        saveEntry(today, entryData);
        alert('Entry saved!');
        onBack();
    };

    return (
        <div className="entry-form">
            <h2>New Entry – {today}</h2>

            {/* Your feelings */}
            <EmojiSelector title="How are you feeling today?" selected={feelingEmoji} onSelect={setFeelingEmoji} />
            <NoteInput placeholder="Add a note about your mood..." value={feelingNote} onChange={setFeelingNote} />

            {/* Sleep */}
            <EmojiSelector title="How did you sleep?" selected={sleepEmoji} onSelect={setSleepEmoji} />
            <NoteInput placeholder="Add a note about your sleep..." value={sleepNote} onChange={setSleepNote} />

            {/* Your Day */}
            <h3>Describe your day</h3>
            <NoteInput placeholder="What happened today?" value={describeDay} onChange={setDescribeDay} />

            {/* Workout */}
            <ConditionalSection label="Did you work out today?" checked={didWorkout} onCheck={setDidWorkout}>
            <input type="text" placeholder="Workout type" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}/>
            <input type="text" placeholder="Duration" value={workoutDuration} onChange={(e) => setWorkoutDuration(e.target.value)} />
            </ConditionalSection>

            {/* Meditate */}
            <ConditionalSection label="Did you meditate today?" checked={didMeditate} onCheck={setDidMeditate} >
            <input type="text" placeholder="Meditation type (e.g., breathing)" value={meditationType} onChange={(e) => setMeditationType(e.target.value)} />
            <input type="text" placeholder="Duration (e.g., 10 minutes)" value={meditationDuration} onChange={(e) => setMeditationDuration(e.target.value)} />
            </ConditionalSection>

            {/* Medication */}
            <ConditionalSection label="Did you take any medication today?" checked={tookMeds} onCheck={setTookMeds} >
            <input type="text" placeholder="Medication name(s)" value={medications} onChange={(e) => setMedications(e.target.value)} />
            <input type="text" placeholder="Time taken (e.g., 8 AM)" value={medTime} onChange={(e) => setMedTime(e.target.value)} />
            </ConditionalSection>

            {/* Pain */}
            <ConditionalSection label="Did you experience pain today?" checked={hadPain} onCheck={setHadPain} >
            <input type="text" placeholder="Where was the pain?" value={painLocation} onChange={(e) => setPainLocation(e.target.value)} />
            <input type="text" placeholder="Pain level (1-10)" value={painLevel} onChange={(e) => setPainLevel(e.target.value)} />
            </ConditionalSection>

            {/* Sleep */}
            <ConditionalSection label="Did you have a dream last night?" checked={hadDream} onCheck={setHadDream} >
            <select value={dreamType} onChange={(e) => setDreamType(e.target.value)} >
                <option value="">-- Select type --</option>
                <option value="positive">😊 Positive</option>
                <option value="neutral">😐 Neutral</option>
                <option value="nightmare">😱 Nightmare</option>
            </select>
            <NoteInput placeholder="Describe your dream (optional)..." value={dreamNote} onChange={setDreamNote} />
            </ConditionalSection>

            <button onClick={handleSubmit}>✅ Save Entry</button>
            <button onClick={onBack}>🔙 Back</button>
        </div>
    );
}
