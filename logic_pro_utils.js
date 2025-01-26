// Logic Pro X Scripting Utilities

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
        'UNDEFINED_20',
        'UNDEFINED_21',
        'UNDEFINED_22',
        'UNDEFINED_23',
        'UNDEFINED_24',
        'UNDEFINED_25',
        'UNDEFINED_26',
        'UNDEFINED_27',
        'UNDEFINED_28',
        'UNDEFINED_29',
        'UNDEFINED_30',
        'UNDEFINED_31',
        'BANK_SELECT_LSB', // 32
        'MOD_WHEEL_LSB', // 33
        'BREATH_CONTROLLER_LSB', // 34
        'UNDEFINED_35',
        'FOOT_CONTROLLER_LSB', // 36
        'PORTAMENTO_TIME_LSB', // 37
        'DATA_ENTRY_LSB', // 38
        'VOLUME_LSB', // 39
        'BALANCE_LSB', // 40
        'UNDEFINED_41',
        'PAN_LSB', // 42
        'EXPRESSION_LSB', // 43
        'EFFECT_CONTROL_1_LSB', // 44
        'EFFECT_CONTROL_2_LSB', // 45
        'UNDEFINED_46',
        'UNDEFINED_47',
        'UNDEFINED_48',
        'UNDEFINED_49',
        'UNDEFINED_50',
        'UNDEFINED_51',
        'UNDEFINED_52',
        'UNDEFINED_53',
        'UNDEFINED_54',
        'UNDEFINED_55',
        'UNDEFINED_56',
        'UNDEFINED_57',
        'UNDEFINED_58',
        'UNDEFINED_59',
        'UNDEFINED_60',
        'UNDEFINED_61',
        'UNDEFINED_62',
        'UNDEFINED_63',
        CC_SUSTAIN_PEDAL, // 64
        CC_PORTAMENTO_SWITCH, // 65
        CC_SOSTENUTO_PEDAL, // 66
        CC_SOFT_PEDAL, // 67
        'LEGATO_SWITCH', // 68
        'HOLD_2', // 69
        CC_SOUND_CONTROLLER_1, // 70 (Sound Variation)
        CC_SOUND_CONTROLLER_2, // 71 (Timbre/Harmonic Content)
        CC_SOUND_CONTROLLER_3, // 72 (Release Time)
        CC_SOUND_CONTROLLER_4, // 73 (Attack Time)
        CC_SOUND_CONTROLLER_5, // 74 (Brightness)
        'SOUND_CONTROLLER_6', // 75
        'SOUND_CONTROLLER_7', // 76
        'SOUND_CONTROLLER_8', // 77
        'SOUND_CONTROLLER_9', // 78
        'SOUND_CONTROLLER_10', // 79
        'GENERAL_PURPOSE_5', // 80
        'GENERAL_PURPOSE_6', // 81
        'GENERAL_PURPOSE_7', // 82
        'GENERAL_PURPOSE_8', // 83
        'PORTAMENTO_CONTROL', // 84
        'UNDEFINED_85',
        'UNDEFINED_86',
        'UNDEFINED_87',
        'UNDEFINED_88',
        'UNDEFINED_89',
        'UNDEFINED_90',
        CC_EFFECTS_1_DEPTH, // 91 (Reverb)
        CC_EFFECTS_2_DEPTH, // 92 (Tremolo)
        CC_EFFECTS_3_DEPTH, // 93 (Chorus)
        'EFFECTS_4_DEPTH', // 94 (Detune)
        'EFFECTS_5_DEPTH', // 95 (Phaser)
        'DATA_INCREMENT', // 96
        'DATA_DECREMENT', // 97
        'NRPN_LSB', // 98
        'NRPN_MSB', // 99
        'RPN_LSB', // 100
        'RPN_MSB', // 101
        'UNDEFINED_102',
        'UNDEFINED_103',
        'UNDEFINED_104',
        'UNDEFINED_105',
        'UNDEFINED_106',
        'UNDEFINED_107',
        'UNDEFINED_108',
        'UNDEFINED_109',
        'UNDEFINED_110',
        'UNDEFINED_111',
        'UNDEFINED_112',
        'UNDEFINED_113',
        'UNDEFINED_114',
        'UNDEFINED_115',
        'UNDEFINED_116',
        'UNDEFINED_117',
        'UNDEFINED_118',
        'UNDEFINED_119',
        'ALL_SOUND_OFF', // 120
        'RESET_ALL_CONTROLLERS', // 121
        'LOCAL_CONTROL', // 122
        'ALL_NOTES_OFF', // 123
        'OMNI_MODE_OFF', // 124
        'OMNI_MODE_ON', // 125
        'MONO_MODE_ON', // 126
        'POLY_MODE_ON' // 127
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
            
            // New patterns:
            shuffle: [0, 35, 0, 35],  // Traditional shuffle (strong swing)
            
            // Triplet feel with slight push on middle note
            triplet: [0, -5, 10, 0, -5, 10],
            
            // Heavy backbeat (delays 2 and 4)
            backbeat: [0, 0, 15, 0], 
            
            // Subtle dragging sixteenth notes
            drag_16: [0, 8, 0, 8, 0, 8, 0, 8],
            
            // "Human" straight feel (subtle random-like variations)
            human: [2, -3, 4, -2, 3, -4, 1, -2],
            
            // Rushed upbeats
            rushed: [0, -8, 0, -8],
            
            // Brazilian samba-inspired (subtle anticipations)
            samba: [0, -5, 8, -3, 0, -5, 8, -3],
            
            // Hip-hop inspired lazy feel
            lazy: [5, 12, 8, 15],
            
            // Funk ghost note timing
            funk: [0, -8, 12, -5, 0, -8, 15, -5],
            
            // Progressive metal inspired (tight but slightly rushed)
            prog: [-3, -3, -3, -3, -2, -2, -2, -2]
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
                // Calculate delay based on velocity (higher velocity = more delay)
                const velocityFactor = event.velocity / 127;
                const delay = velocityFactor * maxDelay;
                event.sendAfterMilliseconds(delay);
                return true;
            }
            return false;
        },
        
        // Combined humanization with all three features
        humanize: function(event, options = {}) {
            // Default values
            const defaults = {
                randomRange: 10,
                groove: this.grooves.swing,
                velocityDelay: 15,
                useGroove: true,
                useRandom: true,
                useVelocity: true
            };

            // Merge passed options with defaults
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
                
                // Apply random variation
                if (settings.useRandom) {
                    totalDelay += (Math.random() * 2 - 1) * settings.randomRange;
                }
                
                // Apply groove pattern
                if (settings.useGroove) {
                    const beatPos = NeedsTimingInfo.blockStartBeat % settings.groove.length;
                    totalDelay += settings.groove[Math.floor(beatPos)];
                }
                
                // Apply velocity-based timing
                if (settings.useVelocity && event instanceof NoteOn) {
                    const velocityFactor = event.velocity / 127;
                    totalDelay += velocityFactor * settings.velocityDelay;
                }
                
                // Apply combined delay
                event.sendAfterMilliseconds(totalDelay);
                return true;
            }
            return false;
        }
    },
    
    // Add new velocity section
    velocity: {
        // Common velocity curves
        curves: {
            // First beat accent (4/4 time)
            fourFourAccent: [127, 90, 100, 85],
            
            // Waltz pattern (3/4 time)
            waltz: [127, 85, 95],
            
            // 16th note groove
            sixteenth: [127, 85, 100, 75, 115, 80, 95, 70, 110, 75, 90, 65, 105, 70, 85, 60],
            
            // Crescendo pattern
            crescendo: [70, 80, 90, 100, 110, 120, 127],
            
            // Diminuendo pattern
            diminuendo: [127, 120, 110, 100, 90, 80, 70]
        },
        
        // Key scaling presets (lower notes louder)
        keyScaling: {
            light: {
                lowNote: 36,  // C2
                highNote: 96, // C7
                lowVelocity: 1.2,  // 20% louder
                highVelocity: 0.9  // 10% softer
            },
            medium: {
                lowNote: 36,
                highNote: 96,
                lowVelocity: 1.4,
                highVelocity: 0.8
            },
            heavy: {
                lowNote: 36,
                highNote: 96,
                lowVelocity: 1.6,
                highVelocity: 0.7
            }
        },
        
        // Apply position-based velocity curve
        applyCurve: function(event, curve = this.curves.fourFourAccent, beatPos = NeedsTimingInfo.blockStartBeat) {
            if (event instanceof NoteOn) {
                const curvePos = Math.floor(beatPos) % curve.length;
                const curveValue = curve[curvePos] / 127; // Normalize to 0-1
                event.velocity = Math.min(127, Math.max(1, Math.round(event.velocity * curveValue)));
                return true;
            }
            return false;
        },
        
        // Apply key scaling to velocity
        applyKeyScaling: function(event, scaling = this.keyScaling.medium) {
            if (event instanceof NoteOn) {
                const { lowNote, highNote, lowVelocity, highVelocity } = scaling;
                const noteRange = highNote - lowNote;
                const velocityRange = lowVelocity - highVelocity;
                
                // Calculate scaling factor based on note position
                const notePosition = (event.pitch - lowNote) / noteRange;
                const scaleFactor = lowVelocity - (notePosition * velocityRange);
                
                // Apply scaling
                event.velocity = Math.min(127, Math.max(1, Math.round(event.velocity * scaleFactor)));
                return true;
            }
            return false;
        },
        
        // Combined velocity processing
        humanize: function(event, options = {}) {
            const defaults = {
                curve: this.curves.fourFourAccent,
                keyScaling: this.keyScaling.medium,
                useCurve: true,
                useKeyScaling: true,
                randomRange: 10,
                randomProbability: 0.8
            };

            const settings = {
                curve: options.curve ?? defaults.curve,
                keyScaling: options.keyScaling ?? defaults.keyScaling,
                useCurve: options.useCurve ?? defaults.useCurve,
                useKeyScaling: options.useKeyScaling ?? defaults.useKeyScaling,
                randomRange: options.randomRange ?? defaults.randomRange,
                randomProbability: options.randomProbability ?? defaults.randomProbability
            };

            if (event instanceof NoteOn) {
                // Store original velocity for percentage calculations
                const originalVelocity = event.velocity;

                // Apply position-based curve
                if (settings.useCurve) {
                    this.applyCurve(event, settings.curve);
                }

                // Apply key scaling
                if (settings.useKeyScaling) {
                    this.applyKeyScaling(event, settings.keyScaling);
                }

                // Add random variation
                if (Math.random() < settings.randomProbability) {
                    const randomFactor = 1 + ((Math.random() * 2 - 1) * settings.randomRange / 100);
                    event.velocity = Math.min(127, Math.max(1, Math.round(event.velocity * randomFactor)));
                }

                return true;
            }
            return false;
        }
    },
    
    // Add new duration section
    duration: {
        // Duration presets based on tempo
        tempoScaling: {
            light: {
                minTempo: 60,
                maxTempo: 180,
                minDurationScale: 0.9,  // At fast tempos
                maxDurationScale: 1.1   // At slow tempos
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
                
                // Calculate scale factor based on current tempo
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
        
        // Prevent note overlaps by ensuring minimum gaps
        preventOverlaps: function(event, minGap = 0.01) {
            if (event instanceof Note) {
                // Logic Pro's Note object includes a 'noteOff' property
                // representing when the note ends in beats
                const nextBeat = event.beatPos + event.duration;
                
                // Adjust duration if it would overlap with the next beat
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
                useOverlapPrevention: true,
                randomProbability: 0.8
            };

            const settings = {
                randomRange: options.randomRange ?? defaults.randomRange,
                tempoScaling: options.tempoScaling ?? defaults.tempoScaling,
                minGap: options.minGap ?? defaults.minGap,
                useRandom: options.useRandom ?? defaults.useRandom,
                useTempoScaling: options.useTempoScaling ?? defaults.useTempoScaling,
                useOverlapPrevention: options.useOverlapPrevention ?? defaults.useOverlapPrevention,
                randomProbability: options.randomProbability ?? defaults.randomProbability
            };

            if (event instanceof Note) {
                // Store original duration for reference
                const originalDuration = event.duration;

                // Apply random variation
                if (settings.useRandom && Math.random() < settings.randomProbability) {
                    this.randomize(event, settings.randomRange);
                }

                // Apply tempo-based scaling
                if (settings.useTempoScaling) {
                    this.applyTempoScaling(event, settings.tempoScaling);
                }

                // Prevent overlaps last
                if (settings.useOverlapPrevention) {
                    this.preventOverlaps(event, settings.minGap);
                }

                return true;
            }
            return false;
        }
    }
};

// Example Scripter Implementation
var PluginParameters = [];

var ArpeggiatorUtils = {
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
        gateTime: 0.8        // Note duration as fraction of step time
    },

    // Store held notes
    heldNotes: [],
    currentStep: 0,
    
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
            gateTime: options.gateTime ?? this.defaults.gateTime
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
            
            // Start arpeggiating if this is the first note
            if (this.heldNotes.length === 1) {
                this.startArpeggiating(settings);
            }
            
        } else if (event instanceof NoteOff) {
            // Remove note from held notes
            this.heldNotes = this.heldNotes.filter(n => n.pitch !== event.pitch);
            
            // Stop arpeggiating if no notes are held
            if (this.heldNotes.length === 0) {
                this.stopArpeggiating();
            }
        }
    },
    
    // Get next note in pattern
    getNextNote: function(settings) {
        if (this.heldNotes.length === 0) return null;
        
        let notes = [...this.heldNotes];
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
                
            case this.patterns.RANDOM:
                noteIndex = Math.floor(Math.random() * notes.length);
                octave = Math.floor(Math.random() * settings.octaveRange);
                break;
                
            default:
                noteIndex = this.currentStep % notes.length;
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
            beatOffset: swingOffset,
            duration: settings.noteDuration * settings.gateTime
        };
        
        this.currentStep = (this.currentStep + 1) % totalSteps;
        return note;
    },
    
    startArpeggiating: function(settings) {
        this.currentStep = 0;
        Trace("Arpeggiator started");
        // Logic Pro will call our HandleMIDI function for each beat
    },
    
    stopArpeggiating: function() {
        this.currentStep = 0;
        Trace("Arpeggiator stopped");
    }
};

// Update HandleMIDI to include arpeggiator
function HandleMIDI(event) {
    // Arpeggiator settings
    const arpSettings = {
        pattern: ArpeggiatorUtils.patterns.UP_DOWN,
        octaveRange: 2,
        noteDuration: 0.25,  // Sixteenth notes
        swing: 0.3,          // Medium swing
        velocityScale: 0.9,  // Slightly softer
        diminuendo: 2,       // Gradual fade
        complexity: 1,       // Play every note
        gateTime: 0.8       // Slightly detached notes
    };

    if (LogicUtils.isNoteEvent(event)) {
        // Process note through arpeggiator
        ArpeggiatorUtils.processNote(event, arpSettings);
        
        // If it's time for a new arpeggiator note
        if (event instanceof NoteOn) {
            const nextNote = ArpeggiatorUtils.getNextNote(arpSettings);
            if (nextNote) {
                // Create and send the new note
                const newNote = new Note();
                newNote.pitch = nextNote.pitch;
                newNote.velocity = nextNote.velocity;
                newNote.duration = nextNote.duration;
                
                // Apply humanization if desired
                CompositionUtils.timing.humanize(newNote, {
                    randomRange: 5,
                    useGroove: false
                });
                
                newNote.sendAfterMilliseconds(nextNote.beatOffset * 1000);
            }
        }
    } else {
        // Handle CC messages as before
        const beatPos = NeedsTimingInfo.blockStartBeat % 16;
        const volumeRamp = LogicUtils.createCCAutomation(CC_VOLUME, 20, 127, 16);
        
        if (event instanceof ControlChange && event.number === LogicUtils.CC_NUMBERS[CC_VOLUME]) {
            event.value = volumeRamp[Math.floor(beatPos)];
        }
        event.send();
    }
}

// Example of how to use CC automation:
function CreateCCSequence() {
    // Create volume fade from 0 to 127 over 16 steps
    const volumeRamp = LogicUtils.createCCAutomation(CC_VOLUME, 0, 127, 16);
    
    // Or using CC number directly
    const modWheelRamp = LogicUtils.createCCAutomation(1, 127, 0, 8);
    
    // Common CC automation examples:
    
    // Expression pedal sweep (CC 11)
    const expressionSwell = LogicUtils.createCCAutomation(CC_EXPRESSION, 0, 127, 32);
    
    // Filter cutoff sweep (CC 74 - Brightness)
    const filterSweep = LogicUtils.createCCAutomation(CC_SOUND_CONTROLLER_5, 20, 127, 64);
    
    // Reverb depth fade out (CC 91)
    const reverbFade = LogicUtils.createCCAutomation(CC_EFFECTS_1_DEPTH, 127, 0, 16);
    
    // Pan from left to right (CC 10)
    const panSweep = LogicUtils.createCCAutomation(CC_PAN, 0, 127, 32);
    
    // Sustain pedal press and release (CC 64)
    const sustainToggle = LogicUtils.createCCAutomation(CC_SUSTAIN_PEDAL, 127, 0, 2);
    
    // Attack time modification (CC 73)
    const attackMod = LogicUtils.createCCAutomation(CC_SOUND_CONTROLLER_4, 0, 64, 8);
    
    // Chorus depth increase (CC 93)
    const chorusIncrease = LogicUtils.createCCAutomation(CC_EFFECTS_3_DEPTH, 0, 90, 16);
}

var ChordUtils = {
    // Scale definitions (intervals from root)
    scales: {
        // Western scales
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
        
        // Arabic maqams (basic examples)
        arabic: {
            rast: [0, 2, 3, 5, 7, 9, 10],      // Similar to Mixolydian
            bayati: [0, 1, 3, 5, 7, 8, 10],    // Similar to Phrygian
            hijaz: [0, 1, 4, 5, 7, 8, 10],     // Characteristic Arabic scale
            saba: [0, 1, 3, 4, 7, 8, 10],
            sikah: [0, 1, 4, 5, 7, 9, 10]
        },
        
        // Indian thaat (basic scales)
        indian: {
            bilawal: [0, 2, 4, 5, 7, 9, 11],   // Similar to Major
            kafi: [0, 2, 3, 5, 7, 9, 10],      // Similar to Dorian
            bhairavi: [0, 1, 3, 5, 7, 8, 10],  // Similar to Phrygian
            kalyan: [0, 2, 4, 6, 7, 9, 11],    // Similar to Lydian
            marwa: [0, 1, 4, 6, 7, 9, 11],
            purvi: [0, 1, 4, 6, 7, 8, 11],
            todi: [0, 1, 3, 6, 7, 8, 11]
        },
        
        // Japanese scales
        japanese: {
            hirajoshi: [0, 2, 3, 7, 8],
            inSen: [0, 1, 5, 7, 10],
            miyakoBushi: [0, 1, 5, 7, 8],
            yoNaNuki: [0, 2, 4, 7, 9]          // Pentatonic without 4th and 7th
        },
        
        // Chinese scales
        chinese: {
            gong: [0, 2, 4, 7, 9],             // Similar to Major Pentatonic
            shang: [0, 2, 5, 7, 10],
            jiao: [0, 3, 5, 8, 10],
            zhi: [0, 2, 5, 7, 9],
            yu: [0, 3, 5, 7, 10]               // Similar to Minor Pentatonic
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
        minor9: [0, 3, 7, 10, 14]
    },
    
    // Common chord progressions
    progressions: {
        basic: {
            I_IV_V: [0, 3, 4],                 // C F G in C
            I_V_vi_IV: [0, 4, 5, 3],           // C G Am F in C
            ii_V_I: [1, 4, 0],                 // Dm G C in C
            I_vi_IV_V: [0, 5, 3, 4],           // C Am F G in C
            i_iv_v: [0, 3, 4]                  // Cm Fm Gm in Cm
        },
        jazz: {
            ii_V_I_maj7: [1, 4, 0],            // With 7th chords
            iii_vi_ii_V: [2, 5, 1, 4],
            turnaround: [0, 5, 1, 4]           // I vi ii V
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

// Example usage in HandleMIDI:
function HandleMIDI(event) {
    if (event instanceof NoteOn) {
        // Example: Play a chord progression in C major
        const root = 60; // Middle C
        const scale = ChordUtils.scales.western.major;
        const progression = ChordUtils.progressions.basic.I_IV_V;
        
        ChordUtils.playProgression(root % 12, scale, progression, {
            octave: Math.floor(root / 12),
            duration: 2,
            interval: 2
        });
    }
    event.send();
}

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
        
        /*
        - Controls the rhythmic subdivision of the effect or pattern
        - Options range from whole notes (1/1) to 32nd notes (1/32)
        - Affects timing of repeats, pattern steps, or modulation rate
        - Works in conjunction with the Rate parameter to determine actual timing
        - Common in arpeggiators, delays, and step-based effects
        - Can be synced to host tempo for rhythmically precise results
        */
        this.createMenu("Time Division", 0, {
            items: ["1/1", "1/2", "1/4", "1/8", "1/16", "1/32"]
        });
        
        // Dynamics parameters
        /*
        - Controls the overall channel volume via MIDI CC#7
        - Range is 0-127 (standard MIDI CC range)
        - Affects the continuous volume level of all notes on the channel
        - Is a channel-wide control that can be automated during playback
        */
        this.createSlider("Volume", 100, 0, 127, {
            unit: "%"
        });
       
        /*
        - Controls the velocity scaling/multiplier for individual note events
        - Range is 0-200% (allows for both reduction and amplification)
        - Affects how hard each individual note is struck/played
        - Is applied per-note at the moment the note is triggered
        - Values over 100% will amplify the original note velocities, while values under 100% will
        reduce them
        */
        this.createSlider("Velocity", 100, 0, 200, {
            unit: "%"
        });
        
        // Effect parameters
        /*
        - Controls the wet/dry balance of the effect processing
        - Range is 0-100% (0 = fully dry, 100 = fully wet)
        - Affects the balance between processed and unprocessed signal
        - Is typically used for effects like delay, reverb, or modulation
        - At 50%, the output will be an equal blend of dry and processed signal
        */
        this.createSlider("Mix", 100, 0, 100, {
            unit: "%"
        });
        
        /*
        - Controls the amount of signal fed back into the effect
        - Range is 0-100% (0 = no feedback, 100 = maximum feedback)
        - Affects the decay/sustain time of time-based effects
        - Is crucial for effects like delay and reverb
        - Higher values create longer tails and can lead to self-oscillation
        */
        this.createSlider("Feedback", 50, 0, 100, {
            unit: "%"
        });


        this.createSlider("Humanize", 0, 0, 100, {
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

    // Effect Parameters
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

// Example usage:
function Initialize() {
    // Create UI parameters
    const rateIndex = ParameterUtils.createSlider("Rate", 120, 20, 999, {
        unit: "bpm",
        type: ParameterUtils.types.LOGARITHMIC
    });
    
    const patternIndex = ParameterUtils.createMenu("Pattern", 0, {
        items: ["Up", "Down", "Up-Down", "Random"]
    });
    
    const scaleIndex = ParameterUtils.createMenu("Scale", 0, {
        items: Object.keys(ChordUtils.scales.western)
    });
    
    // Register parameter handlers
    ParameterUtils.onParameterChanged(rateIndex, function(value) {
        // Update rate-dependent features
        Trace("Rate changed to: " + value);
    });
    
    ParameterUtils.onParameterChanged(patternIndex, function(value) {
        // Update pattern selection
        const patterns = ["up", "down", "upDown", "random"];
        ArpeggiatorUtils.defaults.pattern = patterns[value];
    });
    
    // Initialize parameters
    ParameterUtils.initializeParameters();
}

// Update global PluginParameters
var PluginParameters = ParameterUtils.parameters;

// Update HandleMIDI to use parameter values
function HandleMIDI(event) {
    // Get current parameter values
    const rate = ParameterUtils.getValue(0);  // Rate parameter
    const pattern = ParameterUtils.getValue(1); // Pattern parameter
    
    // Use values in processing
    if (LogicUtils.isNoteEvent(event)) {
        // Update arpeggiator settings based on UI parameters
        const arpSettings = {
            pattern: ArpeggiatorUtils.patterns[pattern],
            noteDuration: 60 / rate,  // Convert BPM to beat duration
            // ... other settings ...
        };
        
        ArpeggiatorUtils.processNote(event, arpSettings);
    }
    
    event.send();
}

// Parameter change handler
function ParameterChanged(param, value) {
    ParameterUtils.handleParameterChange(param, value);
} 