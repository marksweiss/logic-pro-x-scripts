// Generated composition file for test_comp

// Define NeedsTimingInfo as true at the global scope to enable GetTimingInfo()
var NeedsTimingInfo = true;

// MIDI CC Name Constants
const CC_BANK_SELECT = 'BANK_SELECT';
const CC_MOD_WHEEL = 'MOD_WHEEL';
const CC_BREATH_CONTROLLER = 'BREATH_CONTROLLER';
const CC_FOOT_CONTROLLER = 'FOOT_CONTROLLER';
const CC_PORTAMENTO_TIME = 'PORTAMENTO_TIME';
const CC_DATA_ENTRY_MSB = 'DATA_ENTRY_MSB';
const CC_VOLUME = 'VOLUME';
const CC_BALANCE = 'BALANCE';
const CC_PAN = 'PAN';
const CC_EXPRESSION = 'EXPRESSION';
const CC_EFFECT_CONTROL_1 = 'EFFECT_CONTROL_1';
const CC_EFFECT_CONTROL_2 = 'EFFECT_CONTROL_2';
const CC_GENERAL_PURPOSE_1 = 'GENERAL_PURPOSE_1';
const CC_GENERAL_PURPOSE_2 = 'GENERAL_PURPOSE_2';
const CC_GENERAL_PURPOSE_3 = 'GENERAL_PURPOSE_3';
const CC_GENERAL_PURPOSE_4 = 'GENERAL_PURPOSE_4';
const CC_SUSTAIN_PEDAL = 'SUSTAIN_PEDAL';
const CC_PORTAMENTO_SWITCH = 'PORTAMENTO_SWITCH';
const CC_SOSTENUTO_PEDAL = 'SOSTENUTO_PEDAL';
const CC_SOFT_PEDAL = 'SOFT_PEDAL';
const CC_SOUND_CONTROLLER_1 = 'SOUND_CONTROLLER_1';
const CC_SOUND_CONTROLLER_2 = 'SOUND_CONTROLLER_2';
const CC_SOUND_CONTROLLER_3 = 'SOUND_CONTROLLER_3';
const CC_SOUND_CONTROLLER_4 = 'SOUND_CONTROLLER_4';
const CC_SOUND_CONTROLLER_5 = 'SOUND_CONTROLLER_5';
const CC_EFFECTS_1_DEPTH = 'EFFECTS_1_DEPTH';
const CC_EFFECTS_2_DEPTH = 'EFFECTS_2_DEPTH';
const CC_EFFECTS_3_DEPTH = 'EFFECTS_3_DEPTH';

var LogicUtils = {
    // MIDI Constants
    MIDI: {
        NOTE_ON: 144,
        NOTE_OFF: 128,
        CC: 176,
        PITCH_BEND: 224
    },
    
    // MIDI CC Constants and Mappings
    CC_NAMES: [
        CC_BANK_SELECT, // 0
        CC_MOD_WHEEL, // 1
        CC_BREATH_CONTROLLER, // 2
        'UNDEFINED_3',
        CC_FOOT_CONTROLLER, // 4
        CC_PORTAMENTO_TIME, // 5
        CC_DATA_ENTRY_MSB, // 6
        CC_VOLUME, // 7
        CC_BALANCE, // 8
        'UNDEFINED_9',
        CC_PAN, // 10
        CC_EXPRESSION, // 11
        CC_EFFECT_CONTROL_1, // 12
        CC_EFFECT_CONTROL_2, // 13
        'UNDEFINED_14',
        'UNDEFINED_15',
        CC_GENERAL_PURPOSE_1, // 16
        CC_GENERAL_PURPOSE_2, // 17
        CC_GENERAL_PURPOSE_3, // 18
        CC_GENERAL_PURPOSE_4, // 19
        // ... CC numbers 20-63 are undefined
        CC_SUSTAIN_PEDAL, // 64
        CC_PORTAMENTO_SWITCH, // 65
        CC_SOSTENUTO_PEDAL, // 66
        CC_SOFT_PEDAL, // 67
        'LEGATO_SWITCH', // 68
        'HOLD_2', // 69
        CC_SOUND_CONTROLLER_1, // 70
        CC_SOUND_CONTROLLER_2, // 71
        CC_SOUND_CONTROLLER_3, // 72
        CC_SOUND_CONTROLLER_4, // 73
        CC_SOUND_CONTROLLER_5, // 74
        'SOUND_CONTROLLER_6', // 75
        'SOUND_CONTROLLER_7', // 76
        'SOUND_CONTROLLER_8', // 77
        'SOUND_CONTROLLER_9', // 78
        'SOUND_CONTROLLER_10', // 79
        // ... CC numbers 80-90 are undefined
        CC_EFFECTS_1_DEPTH, // 91
        CC_EFFECTS_2_DEPTH, // 92
        CC_EFFECTS_3_DEPTH, // 93
        'EFFECTS_4_DEPTH', // 94
        'EFFECTS_5_DEPTH', // 95
        // ... remaining CC numbers
    ],

    // Create reverse lookup object
    CC_NUMBERS: {},

    // Utility Functions
    createNoteOn: function(pitch, velocity, channel = 0) {
        return {
            type: this.MIDI.NOTE_ON,
            channel: channel,
            pitch: pitch,
            velocity: velocity
        };
    },
    
    createNoteOff: function(pitch, velocity = 0, channel = 0) {
        return {
            type: this.MIDI.NOTE_OFF,
            channel: channel,
            pitch: pitch,
            velocity: velocity
        };
    },
    
    createCC: function(controller, value, channel = 0) {
        return {
            type: this.MIDI.CC,
            channel: channel,
            controller: controller,
            value: value
        };
    },
    
    // Conversion Utilities
    midiNoteToFrequency: function(note) {
        return 440 * Math.pow(2, (note - 69) / 12);
    },
    
    frequencyToMidiNote: function(frequency) {
        return Math.round(12 * Math.log2(frequency / 440) + 69);
    },
    
    // Common MIDI Processing Functions
    transpose: function(event, semitones) {
        if (this.isNoteEvent(event)) {
            event.pitch = Math.min(127, Math.max(0, event.pitch + semitones));
        }
        return event;
    },
    
    velocityScale: function(event, factor) {
        if (event instanceof NoteOn) {
            event.velocity = Math.min(127, Math.max(0, Math.round(event.velocity * factor)));
        }
        return event;
    },
    
    // Helper method to check MIDI event types
    isNoteEvent: function(event) {
        return event instanceof NoteOn || event instanceof NoteOff;
    },

    // Helper functions for CC lookup
    getCCNumber: function(ccName) {
        return this.CC_NUMBERS[ccName];
    },

    getCCName: function(ccNumber) {
        return this.CC_NAMES[ccNumber] || 'UNDEFINED';
    },

    // Helper function to create CC automation
    createCCAutomation: function(ccNameOrNumber, startValue, endValue, steps) {
        const ccNumber = typeof ccNameOrNumber === 'string' ? 
            this.getCCNumber(ccNameOrNumber) : ccNameOrNumber;
        
        if (ccNumber === undefined || ccNumber < 0 || ccNumber > 127) {
            throw new Error('Invalid CC number');
        }

        const values = [];
        for (let i = 0; i < steps; i++) {
            const value = Math.round(startValue + (endValue - startValue) * (i / (steps - 1)));
            values.push(Math.min(127, Math.max(0, value)));
        }
        
        return values;
    }
};

// Initialize CC_NUMBERS reverse lookup
LogicUtils.CC_NAMES.forEach((name, index) => {
    if (!name.startsWith('UNDEFINED')) {
        LogicUtils.CC_NUMBERS[name] = index;
    }
}); 
var CompositionUtils = {
    // Timing humanization settings
    timing: {
        // Common groove patterns (in milliseconds)
        grooves: {
            swing: [0, 20, -5, 15],  // Swing feel
            push: [-10, 5, -8, 3],   // Slightly ahead feel
            laid_back: [5, -3, 8, -5], // Relaxed feel
            shuffle: [0, 35, 0, 35],  // Traditional shuffle (strong swing)
            triplet: [0, -5, 10, 0, -5, 10], // Triplet feel with slight push
            backbeat: [0, 0, 15, 0],  // Heavy backbeat (delays 2 and 4)
            drag_16: [0, 8, 0, 8, 0, 8, 0, 8], // Subtle dragging sixteenths
            human: [2, -3, 4, -2, 3, -4, 1, -2], // "Human" straight feel
            rushed: [0, -8, 0, -8], // Rushed upbeats
            samba: [0, -5, 8, -3, 0, -5, 8, -3], // Brazilian samba-inspired
            lazy: [5, 12, 8, 15], // Hip-hop inspired lazy feel
            funk: [0, -8, 12, -5, 0, -8, 15, -5] // Funk ghost note timing
        },
        
        // Random timing variation
        randomize: function(event, range = 10) {
            const variation = (Math.random() * 2 - 1) * range;
            event.sendAfterMilliseconds(variation);
            return event;
        },
        
        // Apply groove pattern
        applyGroove: function(event, groove = this.grooves.swing, beatPos = NeedsTimingInfo.blockStartBeat % groove.length) {
            const shift = groove[Math.floor(beatPos)];
            event.sendAfterMilliseconds(shift);
            return event;
        },
        
        // Velocity-dependent timing (harder notes slightly delayed)
        velocityBasedTiming: function(event, maxDelay = 15) {
            if (event instanceof NoteOn) {
                const velocityFactor = event.velocity / 127;
                const delay = velocityFactor * maxDelay;
                event.sendAfterMilliseconds(delay);
                return true;
            }
            return false;
        },
        
        // Combined humanization with all three features
        humanize: function(event, options = {}) {
            const defaults = {
                randomRange: 10,
                groove: this.grooves.swing,
                velocityDelay: 15,
                useGroove: true,
                useRandom: true,
                useVelocity: true
            };

            const settings = {
                randomRange: options.randomRange ?? defaults.randomRange,
                groove: options.groove ?? defaults.groove,
                velocityDelay: options.velocityDelay ?? defaults.velocityDelay,
                useGroove: options.useGroove ?? defaults.useGroove,
                useRandom: options.useRandom ?? defaults.useRandom,
                useVelocity: options.useVelocity ?? defaults.useVelocity
            };

            if (event instanceof NoteOn || event instanceof NoteOff) {
                let totalDelay = 0;
                
                if (settings.useRandom) {
                    totalDelay += (Math.random() * 2 - 1) * settings.randomRange;
                }
                
                if (settings.useGroove) {
                    const beatPos = NeedsTimingInfo.blockStartBeat % settings.groove.length;
                    totalDelay += settings.groove[Math.floor(beatPos)];
                }
                
                if (settings.useVelocity && event instanceof NoteOn) {
                    const velocityFactor = event.velocity / 127;
                    totalDelay += velocityFactor * settings.velocityDelay;
                }
                
                event.sendAfterMilliseconds(totalDelay);
                return true;
            }
            return false;
        }
    },
    
    velocity: {
        // Common velocity curves
        curves: {
            fourFourAccent: [127, 90, 100, 85],  // First beat accent (4/4 time)
            waltz: [127, 85, 95],  // Waltz pattern (3/4 time)
            sixteenth: [127, 85, 100, 75, 115, 80, 95, 70],  // 16th note groove
            crescendo: [70, 80, 90, 100, 110, 120, 127],  // Gradual increase
            diminuendo: [127, 120, 110, 100, 90, 80, 70]  // Gradual decrease
        },
        
        // Apply velocity curve
        applyCurve: function(event, curve = this.curves.fourFourAccent, beatPos = NeedsTimingInfo.blockStartBeat) {
            if (event instanceof NoteOn) {
                const curvePos = Math.floor(beatPos) % curve.length;
                const curveValue = curve[curvePos] / 127;
                event.velocity = Math.min(127, Math.max(1, Math.round(event.velocity * curveValue)));
                return true;
            }
            return false;
        },
        
        // Random velocity variation
        randomize: function(event, range = 20) {
            if (event instanceof NoteOn) {
                const variation = 1 + ((Math.random() * 2 - 1) * range / 100);
                event.velocity = Math.min(127, Math.max(1, Math.round(event.velocity * variation)));
                return true;
            }
            return false;
        },
        
        // Combined velocity processing
        humanize: function(event, options = {}) {
            const defaults = {
                curve: this.curves.fourFourAccent,
                randomRange: 20,
                useCurve: true,
                useRandom: true
            };

            const settings = {
                curve: options.curve ?? defaults.curve,
                randomRange: options.randomRange ?? defaults.randomRange,
                useCurve: options.useCurve ?? defaults.useCurve,
                useRandom: options.useRandom ?? defaults.useRandom
            };

            if (event instanceof NoteOn) {
                if (settings.useCurve) {
                    this.applyCurve(event, settings.curve);
                }
                
                if (settings.useRandom) {
                    this.randomize(event, settings.randomRange);
                }
                
                return true;
            }
            return false;
        }
    },
    
    duration: {
        // Duration presets based on tempo
        tempoScaling: {
            light: {
                minTempo: 60,
                maxTempo: 180,
                minDurationScale: 0.9,
                maxDurationScale: 1.1
            },
            medium: {
                minTempo: 60,
                maxTempo: 180,
                minDurationScale: 0.8,
                maxDurationScale: 1.2
            },
            heavy: {
                minTempo: 60,
                maxTempo: 180,
                minDurationScale: 0.7,
                maxDurationScale: 1.3
            }
        },
        
        // Random duration variation
        randomize: function(event, range = 0.1) {
            if (event instanceof Note) {
                const variation = 1 + ((Math.random() * 2 - 1) * range);
                event.duration = Math.max(0.1, event.duration * variation);
                return true;
            }
            return false;
        },
        
        // Scale duration based on tempo
        applyTempoScaling: function(event, scaling = this.tempoScaling.medium) {
            if (event instanceof Note) {
                const { minTempo, maxTempo, minDurationScale, maxDurationScale } = scaling;
                const currentTempo = NeedsTimingInfo.tempo;
                
                const tempoPosition = Math.max(0, Math.min(1, 
                    (currentTempo - minTempo) / (maxTempo - minTempo)
                ));
                const scaleFactor = maxDurationScale - 
                    (tempoPosition * (maxDurationScale - minDurationScale));
                
                event.duration = Math.max(0.1, event.duration * scaleFactor);
                return true;
            }
            return false;
        },
        
        // Prevent note overlaps
        preventOverlaps: function(event, minGap = 0.01) {
            if (event instanceof Note) {
                const nextBeat = event.beatPos + event.duration;
                
                if (nextBeat > NeedsTimingInfo.nextBeat - minGap) {
                    event.duration = Math.max(0.1, 
                        NeedsTimingInfo.nextBeat - event.beatPos - minGap);
                }
                return true;
            }
            return false;
        },
        
        // Combined duration processing
        humanize: function(event, options = {}) {
            const defaults = {
                randomRange: 0.1,
                tempoScaling: this.tempoScaling.medium,
                minGap: 0.01,
                useRandom: true,
                useTempoScaling: true,
                useOverlapPrevention: true
            };

            const settings = {
                randomRange: options.randomRange ?? defaults.randomRange,
                tempoScaling: options.tempoScaling ?? defaults.tempoScaling,
                minGap: options.minGap ?? defaults.minGap,
                useRandom: options.useRandom ?? defaults.useRandom,
                useTempoScaling: options.useTempoScaling ?? defaults.useTempoScaling,
                useOverlapPrevention: options.useOverlapPrevention ?? defaults.useOverlapPrevention
            };

            if (event instanceof Note) {
                if (settings.useRandom) {
                    this.randomize(event, settings.randomRange);
                }
                
                if (settings.useTempoScaling) {
                    this.applyTempoScaling(event, settings.tempoScaling);
                }
                
                if (settings.useOverlapPrevention) {
                    this.preventOverlaps(event, settings.minGap);
                }
                
                return true;
            }
            return false;
        }
    }
}; 
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
var ParameterUtils = {
    // Parameter type constants
    types: {
        LINEAR: 'lin',
        LOGARITHMIC: 'log',
        MENU: 'menu'
    },
    
    // Parameter definitions
    parameters: [],
    
    // Create a slider parameter
    createSlider: function(name, defaultValue, minValue, maxValue, options = {}) {
        const param = {
            name: name,
            type: options.type || this.types.LINEAR,
            defaultValue: defaultValue,
            minValue: minValue,
            maxValue: maxValue,
            numberOfSteps: options.steps || 128,
            unit: options.unit || '',
            hidden: options.hidden || false
        };
        
        this.parameters.push(param);
        return this.parameters.length - 1; // Return parameter index
    },
    
    // Create a menu parameter
    createMenu: function(name, defaultValue, options = {}) {
        const param = {
            name: name,
            type: this.types.MENU,
            defaultValue: defaultValue,
            valueStrings: options.items || [],
            hidden: options.hidden || false
        };
        
        this.parameters.push(param);
        return this.parameters.length - 1;
    },
    
    // Add items to an existing menu
    addMenuItems: function(menuIndex, items) {
        if (this.parameters[menuIndex] && this.parameters[menuIndex].type === this.types.MENU) {
            this.parameters[menuIndex].valueStrings = 
                this.parameters[menuIndex].valueStrings.concat(items);
        }
    },
    
    // Create common parameter groups
    createCommonParameters: function() {
        // Time-based parameters
        this.createSlider("Rate", 120, 20, 999, {
            unit: "bpm",
            type: this.types.LOGARITHMIC
        });
        
        this.createMenu("Time Division", 0, {
            items: ["1/1", "1/2", "1/4", "1/8", "1/16", "1/32"]
        });
        
        this.createSlider("Swing", 0, 0, 100, {
            unit: "%"
        });

        // Dynamics parameters
        this.createSlider("Volume", 100, 0, 127, {
            unit: "%"
        });
        
        this.createSlider("Velocity", 100, 0, 200, {
            unit: "%"
        });

        this.createSlider("Humanize", 0, 0, 100, {
            unit: "%"
        });

        // Effect parameters
        this.createSlider("Mix", 100, 0, 100, {
            unit: "%"
        });

        this.createSlider("Feedback", 50, 0, 100, {
            unit: "%"
        });

        this.createSlider("Delay Time", 500, 10, 2000, {
            unit: "ms",
            type: this.types.LOGARITHMIC
        });

        this.createSlider("Reverb Size", 50, 0, 100, {
            unit: "%"
        });

        this.createSlider("Chorus Rate", 1.0, 0.1, 10.0, {
            unit: "Hz",
            type: this.types.LOGARITHMIC
        });

        this.createSlider("Chorus Depth", 50, 0, 100, {
            unit: "%"
        });

        // Randomization Parameters
        this.createSlider("Random Pitch", 0, 0, 12, {
            unit: "semi"
        });

        this.createSlider("Random Velocity", 0, 0, 50, {
            unit: "%"
        });

        // Note Parameters
        this.createSlider("Transpose", 0, -24, 24, {
            unit: "semi"
        });

        this.createSlider("Fine Tune", 0, -100, 100, {
            unit: "cents"
        });

        this.createSlider("Gate Length", 100, 1, 200, {
            unit: "%"
        });

        // Modulation Parameters
        this.createSlider("LFO Rate", 1.0, 0.1, 20.0, {
            unit: "Hz",
            type: this.types.LOGARITHMIC
        });

        this.createSlider("LFO Depth", 50, 0, 100, {
            unit: "%"
        });

        this.createMenu("LFO Wave", 0, {
            items: ["Sine", "Triangle", "Square", "Saw", "Random"]
        });

        // Filter Parameters
        this.createSlider("Cutoff", 127, 0, 127);

        this.createSlider("Resonance", 0, 0, 127);

        // Envelope Parameters
        this.createSlider("Attack", 0, 0, 127, {
            unit: "ms",
            type: this.types.LOGARITHMIC
        });

        this.createSlider("Release", 50, 0, 127, {
            unit: "ms",
            type: this.types.LOGARITHMIC
        });

        // Pattern/Sequence Parameters
        this.createMenu("Key", 0, {
            items: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
        });

        this.createMenu("Scale", 0, {
            items: ["Major", "Minor", "Harmonic Minor", "Melodic Minor", "Dorian", "Phrygian", "Lydian", "Mixolydian"]
        });

        this.createSlider("Octave Range", 1, 1, 4, {
            unit: "oct",
            steps: 4
        });

        // Performance Parameters
        this.createSlider("Pitch Bend Range", 2, 0, 24, {
            unit: "semi",
            steps: 25
        });

        this.createMenu("Channel", 1, {
            items: Array.from({length: 16}, (_, i) => `Channel ${i + 1}`)
        });

        // Performance Mode Parameters
        this.createMenu("Mode", 0, {
            items: ["Normal", "Latch", "Chord Memory", "Arpeggiator"]
        });

        this.createMenu("Chord Type", 0, {
            items: ["Major", "Minor", "7th", "maj7", "min7", "dim", "aug"]
        });
    },
    
    // Parameter event handlers
    handlers: {},
    
    // Register a parameter change handler
    onParameterChanged: function(paramIndex, handler) {
        this.handlers[paramIndex] = handler;
    },
    
    // Handle parameter changes
    handleParameterChange: function(param, value) {
        if (this.handlers[param]) {
            this.handlers[param](value);
        }
    },
    
    // Get current parameter value
    getValue: function(paramIndex) {
        return GetParameter(paramIndex);
    },
    
    // Set parameter value
    setValue: function(paramIndex, value) {
        SetParameter(paramIndex, value);
    },
    
    // Initialize all parameters to their default values
    initializeParameters: function() {
        this.parameters.forEach((param, index) => {
            this.setValue(index, param.defaultValue);
        });
    }
}; 
var ArpeggiatorUtils = {
    // Add enabled flag
    enabled: false,

    // Arpeggio patterns
    patterns: {
        UP: 'up',
        DOWN: 'down',
        UP_DOWN: 'upDown',
        DOWN_UP: 'downUp',
        INSIDE_OUT: 'insideOut',
        OUTSIDE_IN: 'outsideIn',
        RANDOM: 'random',
        AS_PLAYED: 'asPlayed'
    },

    // Default settings
    defaults: {
        pattern: 'up',
        octaveRange: 1,
        noteDuration: 0.5,    // In beats
        swing: 0,             // 0-0.5, where 0.5 is max swing
        velocityScale: 1.0,   // Base velocity multiplier
        diminuendo: 0,        // Velocity reduction per step (0-127)
        complexity: 1,        // 1 = every note, 2 = every other note, etc.
        gateTime: 0.8,       // Note duration as fraction of step time
        latch: false,        // When true, notes are held after key release
        mute: false          // When true, arpeggiator is silent
    },

    // Store held notes and state
    heldNotes: [],
    latchedNotes: [],
    currentStep: 0,
    lastStepTime: 0,
    
    // Process incoming notes
    processNote: function(event, options = {}) {
        const settings = {
            pattern: options.pattern ?? this.defaults.pattern,
            octaveRange: options.octaveRange ?? this.defaults.octaveRange,
            noteDuration: options.noteDuration ?? this.defaults.noteDuration,
            swing: options.swing ?? this.defaults.swing,
            velocityScale: options.velocityScale ?? this.defaults.velocityScale,
            diminuendo: options.diminuendo ?? this.defaults.diminuendo,
            complexity: options.complexity ?? this.defaults.complexity,
            gateTime: options.gateTime ?? this.defaults.gateTime,
            latch: options.latch ?? this.defaults.latch,
            mute: options.mute ?? this.defaults.mute
        };

        if (event instanceof NoteOn) {
            // Add note to held notes
            this.heldNotes.push({
                pitch: event.pitch,
                velocity: event.velocity,
                originalTime: event.beatPos
            });
            
            // Sort notes based on pitch
            this.heldNotes.sort((a, b) => a.pitch - b.pitch);
            
            if (settings.latch) {
                this.latchedNotes = [...this.heldNotes];
            }
            
            // Start arpeggiating if this is the first note
            if (this.heldNotes.length === 1) {
                this.startArpeggiating(settings);
            }
            
        } else if (event instanceof NoteOff) {
            // Remove note from held notes
            this.heldNotes = this.heldNotes.filter(n => n.pitch !== event.pitch);
            
            // Stop arpeggiating if no notes are held and not latched
            if (this.heldNotes.length === 0 && !settings.latch) {
                this.stopArpeggiating();
            }
        }
    },
    
    // Get next note in pattern
    getNextNote: function(settings) {
        const notes = settings.latch ? this.latchedNotes : this.heldNotes;
        if (notes.length === 0) return null;
        
        const totalSteps = notes.length * settings.octaveRange;
        
        // Skip steps based on complexity
        if (this.currentStep % settings.complexity !== 0) {
            this.currentStep = (this.currentStep + 1) % totalSteps;
            return null;
        }

        let noteIndex;
        let octave = 0;
        
        switch (settings.pattern) {
            case this.patterns.UP:
                noteIndex = this.currentStep % notes.length;
                octave = Math.floor(this.currentStep / notes.length);
                break;
                
            case this.patterns.DOWN:
                noteIndex = (notes.length - 1) - (this.currentStep % notes.length);
                octave = Math.floor(this.currentStep / notes.length);
                break;
                
            case this.patterns.UP_DOWN:
                const upDownTotal = (notes.length * 2) - 2;
                const position = this.currentStep % upDownTotal;
                noteIndex = position < notes.length ? position : upDownTotal - position;
                octave = Math.floor(this.currentStep / upDownTotal);
                break;
                
            case this.patterns.INSIDE_OUT:
                const middle = Math.floor(notes.length / 2);
                noteIndex = this.currentStep % 2 === 0 
                    ? middle - Math.floor(this.currentStep / 2)
                    : middle + Math.ceil(this.currentStep / 2);
                break;
                
            case this.patterns.OUTSIDE_IN:
                const total = notes.length - 1;
                noteIndex = this.currentStep % 2 === 0
                    ? Math.floor(this.currentStep / 2)
                    : total - Math.floor(this.currentStep / 2);
                break;
                
            case this.patterns.RANDOM:
                noteIndex = Math.floor(Math.random() * notes.length);
                octave = Math.floor(Math.random() * settings.octaveRange);
                break;
                
            case this.patterns.AS_PLAYED:
                noteIndex = this.currentStep % notes.length;
                // Notes remain in the order they were played
                break;
        }
        
        // Calculate velocity with diminuendo
        const velocityReduction = (this.currentStep * settings.diminuendo);
        const newVelocity = Math.max(1, Math.min(127, 
            Math.round(notes[noteIndex].velocity * settings.velocityScale - velocityReduction)
        ));
        
        // Calculate timing with swing
        const swingOffset = (this.currentStep % 2) * settings.swing * settings.noteDuration;
        
        const note = {
            pitch: notes[noteIndex].pitch + (octave * 12),
            velocity: newVelocity,
            duration: settings.noteDuration * settings.gateTime,
            beatOffset: swingOffset
        };
        
        this.currentStep = (this.currentStep + 1) % totalSteps;
        return note;
    },
    
    startArpeggiating: function(settings) {
        this.currentStep = 0;
        this.lastStepTime = 0;
        if (!settings.mute) {
            Trace("Arpeggiator started");
        }
    },
    
    stopArpeggiating: function() {
        this.currentStep = 0;
        this.lastStepTime = 0;
        this.latchedNotes = [];
        Trace("Arpeggiator stopped");
    },
    
    // Reset arpeggiator state
    reset: function() {
        this.heldNotes = [];
        this.latchedNotes = [];
        this.currentStep = 0;
        this.lastStepTime = 0;
        this.defaults.mute = false;
        this.defaults.latch = false;
        this.enabled = false;
    }
}; 

// #################################################################################################

function Initialize() {
    // TODO: Initialize your composition parameters here
}

function HandleMIDI(event) {
    // TODO: Handle MIDI events here
}

function ParameterChanged(param, value) {
    ParameterUtils.handleParameterChange(param, value);
}

// Update global PluginParameters
var PluginParameters = ParameterUtils.parameters;
