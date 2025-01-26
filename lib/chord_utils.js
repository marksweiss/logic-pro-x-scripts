var ChordUtils = {
    // Scale definitions (intervals from root)
    scales: {
        western: {
            major: [0, 2, 4, 5, 7, 9, 11],
            minor: [0, 2, 3, 5, 7, 8, 10],
            harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
            melodicMinor: [0, 2, 3, 5, 7, 9, 11],
            dorian: [0, 2, 3, 5, 7, 9, 10],
            phrygian: [0, 1, 3, 5, 7, 8, 10],
            lydian: [0, 2, 4, 6, 7, 9, 11],
            mixolydian: [0, 2, 4, 5, 7, 9, 10],
            locrian: [0, 1, 3, 5, 6, 8, 10],
            wholeTone: [0, 2, 4, 6, 8, 10],
            diminished: [0, 2, 3, 5, 6, 8, 9, 11],
            pentatonicMajor: [0, 2, 4, 7, 9],
            pentatonicMinor: [0, 3, 5, 7, 10],
            blues: [0, 3, 5, 6, 7, 10]
        },
        
        arabic: {
            rast: [0, 2, 3, 5, 7, 9, 10],      // Similar to Mixolydian
            bayati: [0, 1, 3, 5, 7, 8, 10],    // Similar to Phrygian
            hijaz: [0, 1, 4, 5, 7, 8, 10],     // Characteristic Arabic scale
            saba: [0, 1, 3, 4, 7, 8, 10],
            sikah: [0, 1, 4, 5, 7, 9, 10],
            nahawand: [0, 2, 3, 5, 7, 8, 11],  // Similar to Harmonic Minor
            ajam: [0, 2, 4, 5, 7, 9, 11]       // Similar to Major
        },
        
        indian: {
            bilawal: [0, 2, 4, 5, 7, 9, 11],   // Similar to Major
            kafi: [0, 2, 3, 5, 7, 9, 10],      // Similar to Dorian
            bhairavi: [0, 1, 3, 5, 7, 8, 10],  // Similar to Phrygian
            kalyan: [0, 2, 4, 6, 7, 9, 11],    // Similar to Lydian
            marwa: [0, 1, 4, 6, 7, 9, 11],
            purvi: [0, 1, 4, 6, 7, 8, 11],
            todi: [0, 1, 3, 6, 7, 8, 11],
            bhairav: [0, 1, 4, 5, 7, 8, 11]
        },
        
        japanese: {
            hirajoshi: [0, 2, 3, 7, 8],
            inSen: [0, 1, 5, 7, 10],
            miyakoBushi: [0, 1, 5, 7, 8],
            yoNaNuki: [0, 2, 4, 7, 9],         // Pentatonic without 4th and 7th
            ritsu: [0, 2, 3, 5, 7, 9, 10],     // Similar to Dorian
            ryukyu: [0, 4, 5, 7, 11]           // Okinawan scale
        },
        
        chinese: {
            gong: [0, 2, 4, 7, 9],             // Similar to Major Pentatonic
            shang: [0, 2, 5, 7, 10],
            jiao: [0, 3, 5, 8, 10],
            zhi: [0, 2, 5, 7, 9],
            yu: [0, 3, 5, 7, 10],              // Similar to Minor Pentatonic
            qingYue: [0, 2, 3, 7, 8]           // Similar to Japanese Hirajoshi
        }
    },
    
    // Chord definitions (intervals from root)
    chords: {
        major: [0, 4, 7],
        minor: [0, 3, 7],
        diminished: [0, 3, 6],
        augmented: [0, 4, 8],
        sus2: [0, 2, 7],
        sus4: [0, 5, 7],
        major7: [0, 4, 7, 11],
        minor7: [0, 3, 7, 10],
        dominant7: [0, 4, 7, 10],
        diminished7: [0, 3, 6, 9],
        halfDiminished7: [0, 3, 6, 10],
        minorMajor7: [0, 3, 7, 11],
        augmented7: [0, 4, 8, 10],
        ninth: [0, 4, 7, 10, 14],
        minor9: [0, 3, 7, 10, 14],
        major9: [0, 4, 7, 11, 14],
        add9: [0, 4, 7, 14],
        sixth: [0, 4, 7, 9],
        minor6: [0, 3, 7, 9]
    },
    
    // Common chord progressions
    progressions: {
        basic: {
            I_IV_V: [0, 3, 4],                 // C F G in C
            I_V_vi_IV: [0, 4, 5, 3],           // C G Am F in C
            ii_V_I: [1, 4, 0],                 // Dm G C in C
            I_vi_IV_V: [0, 5, 3, 4],           // C Am F G in C
            i_iv_v: [0, 3, 4],                 // Cm Fm Gm in Cm
            I_V_vi_iii: [0, 4, 5, 2]           // C G Am Em in C
        },
        jazz: {
            ii_V_I_maj7: [1, 4, 0],            // With 7th chords
            iii_vi_ii_V: [2, 5, 1, 4],
            turnaround: [0, 5, 1, 4],          // I vi ii V
            rhythm_changes: [0, 5, 1, 4, 0, 5, 1, 4, 3, 6, 2, 5, 0, 5, 1, 4]
        }
    },
    
    // Generate a scale from root note
    generateScale: function(root, scale) {
        return scale.map(interval => (root + interval) % 12);
    },
    
    // Generate a chord from root note and chord type
    generateChord: function(root, chordType) {
        return this.chords[chordType].map(interval => (root + interval) % 12);
    },
    
    // Generate a chord progression in a given scale
    generateProgression: function(root, scale, progression) {
        const scaleNotes = this.generateScale(root, scale);
        return progression.map(degree => {
            // Get the root note for this chord from the scale
            const chordRoot = scaleNotes[degree];
            // Generate triad based on scale degrees
            return this.generateChordInScale(chordRoot, scale, degree);
        });
    },
    
    // Generate a chord within a scale (considering scale degrees)
    generateChordInScale: function(root, scale, degree) {
        const scaleNotes = this.generateScale(root, scale);
        // Basic triad: root, third, fifth
        return [
            scaleNotes[degree % scale.length],
            scaleNotes[(degree + 2) % scale.length],
            scaleNotes[(degree + 4) % scale.length]
        ];
    },
    
    // Create MIDI notes from a chord
    createChordNotes: function(chord, octave = 4, velocity = 100, duration = 1) {
        return chord.map(note => {
            const midiNote = new Note();
            midiNote.pitch = note + (octave * 12);
            midiNote.velocity = velocity;
            midiNote.duration = duration;
            return midiNote;
        });
    },
    
    // Play a chord progression
    playProgression: function(root, scale, progression, options = {}) {
        const defaults = {
            octave: 4,
            velocity: 100,
            duration: 1,
            interval: 1  // Time between chords in beats
        };
        
        const settings = {
            octave: options.octave ?? defaults.octave,
            velocity: options.velocity ?? defaults.velocity,
            duration: options.duration ?? defaults.duration,
            interval: options.interval ?? defaults.interval
        };
        
        const chords = this.generateProgression(root, scale, progression);
        let beatOffset = 0;
        
        chords.forEach(chord => {
            const notes = this.createChordNotes(
                chord, 
                settings.octave, 
                settings.velocity, 
                settings.duration
            );
            
            notes.forEach(note => {
                note.sendAfterBeats(beatOffset);
            });
            
            beatOffset += settings.interval;
        });
    }
}; 