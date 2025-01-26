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