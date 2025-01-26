// Global script functions
function Initialize() {
    // Create Time-based parameters
    const rateIndex = ParameterUtils.createSlider("Rate", 120, 20, 999, {
        unit: "bpm",
        type: ParameterUtils.types.LOGARITHMIC
    });
    
    const divisionIndex = ParameterUtils.createMenu("Time Division", 0, {
        items: ["1/1", "1/2", "1/4", "1/8", "1/16", "1/32"]
    });
    
    const swingIndex = ParameterUtils.createSlider("Swing", 0, 0, 100, {
        unit: "%"
    });

    // Create Volume parameter
    const volumeIndex = ParameterUtils.createSlider("Volume", 100, 0, 127, {
        unit: "%"
    });

    // Create Arpeggiator parameters
    const patternIndex = ParameterUtils.createMenu("Pattern", 0, {
        items: Object.values(ArpeggiatorUtils.patterns)
    });
    
    const octaveRangeIndex = ParameterUtils.createSlider("Octave Range", 1, 1, 4, {
        unit: "oct",
        steps: 4
    });
    
    const gateTimeIndex = ParameterUtils.createSlider("Gate Time", 80, 1, 200, {
        unit: "%"
    });

    // Create Scale/Key parameters
    const keyIndex = ParameterUtils.createMenu("Key", 0, {
        items: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    });
    
    const scaleTypeIndex = ParameterUtils.createMenu("Scale", 0, {
        items: Object.keys(ChordUtils.scales.western)
    });

    // Create Effect parameters
    const humanizeIndex = ParameterUtils.createSlider("Humanize", 0, 0, 100, {
        unit: "%"
    });
    
    const velocityIndex = ParameterUtils.createSlider("Velocity", 100, 0, 200, {
        unit: "%"
    });
    
    const diminuendoIndex = ParameterUtils.createSlider("Diminuendo", 0, 0, 127);

    // Add Arpeggiator Enable toggle
    const arpEnableIndex = ParameterUtils.createMenu("Arpeggiator", 0, {
        items: ["Off", "On"]
    });

    // Register parameter handlers
    ParameterUtils.onParameterChanged(rateIndex, function(value) {
        ArpeggiatorUtils.defaults.noteDuration = 60 / value;
    });
    
    ParameterUtils.onParameterChanged(divisionIndex, function(value) {
        const divisions = [1, 2, 4, 8, 16, 32];
        ArpeggiatorUtils.defaults.noteDuration *= divisions[value] / divisions[value - 1];
    });
    
    ParameterUtils.onParameterChanged(swingIndex, function(value) {
        ArpeggiatorUtils.defaults.swing = value / 200; // Convert 0-100 to 0-0.5
    });
    
    ParameterUtils.onParameterChanged(patternIndex, function(value) {
        ArpeggiatorUtils.defaults.pattern = Object.values(ArpeggiatorUtils.patterns)[value];
    });
    
    ParameterUtils.onParameterChanged(octaveRangeIndex, function(value) {
        ArpeggiatorUtils.defaults.octaveRange = value;
    });
    
    ParameterUtils.onParameterChanged(gateTimeIndex, function(value) {
        ArpeggiatorUtils.defaults.gateTime = value / 100;
    });
    
    ParameterUtils.onParameterChanged(humanizeIndex, function(value) {
        CompositionUtils.timing.humanize.defaults.randomRange = value / 10;
    });
    
    ParameterUtils.onParameterChanged(velocityIndex, function(value) {
        ArpeggiatorUtils.defaults.velocityScale = value / 100;
    });
    
    ParameterUtils.onParameterChanged(diminuendoIndex, function(value) {
        ArpeggiatorUtils.defaults.diminuendo = value;
    });

    ParameterUtils.onParameterChanged(volumeIndex, function(value) {
        // Send CC message for volume (CC 7)
        const cc = new ControlChange();
        cc.number = LogicUtils.CC_NUMBERS[CC_VOLUME];
        cc.value = value;
        cc.send();
    });

    // Add handler for the enable toggle
    ParameterUtils.onParameterChanged(arpEnableIndex, function(value) {
        ArpeggiatorUtils.enabled = (value === 1);
        if (!ArpeggiatorUtils.enabled) {
            ArpeggiatorUtils.reset();
        }
    });

    // Initialize all parameters
    ParameterUtils.initializeParameters();
    
    // Reset arpeggiator state
    ArpeggiatorUtils.reset();
}

function HandleMIDI(event) {
    // Get current parameter values for processing
    const humanize = ParameterUtils.getValue("Humanize");
    const key = ParameterUtils.getValue("Key");
    const scale = ParameterUtils.getValue("Scale");
    
    if (LogicUtils.isNoteEvent(event)) {
        if (ArpeggiatorUtils.enabled) {
            // Process through arpeggiator
            ArpeggiatorUtils.processNote(event);
            
            // Get next arpeggiator note if available
            if (event instanceof NoteOn) {
                const nextNote = ArpeggiatorUtils.getNextNote(ArpeggiatorUtils.defaults);
                if (nextNote) {
                    // Create and send the new note
                    const newNote = new Note();
                    newNote.pitch = nextNote.pitch;
                    newNote.velocity = nextNote.velocity;
                    newNote.duration = nextNote.duration;
                    
                    // Apply humanization if enabled
                    if (humanize > 0) {
                        CompositionUtils.timing.humanize(newNote, {
                            randomRange: humanize / 10,
                            useGroove: false
                        });
                        
                        CompositionUtils.velocity.humanize(newNote, {
                            randomRange: humanize / 5
                        });
                    }
                    
                    newNote.sendAfterBeats(nextNote.beatOffset);
                }
            }
        } else {
            // Pass through the note event when arpeggiator is disabled
            event.send();
        }
    } else if (event instanceof ControlChange) {
        // Process CC messages (volume ramp example)
        const beatPos = NeedsTimingInfo.blockStartBeat % 16;
        const volumeRamp = LogicUtils.createCCAutomation(CC_VOLUME, 20, 127, 16);
        
        if (event.number === LogicUtils.CC_NUMBERS[CC_VOLUME]) {
            event.value = volumeRamp[Math.floor(beatPos)];
        }
        event.send();
    } else {
        // Pass through all other MIDI events
        event.send();
    }
}

function ParameterChanged(param, value) {
    ParameterUtils.handleParameterChange(param, value);
}

// Update global PluginParameters
var PluginParameters = ParameterUtils.parameters; 