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