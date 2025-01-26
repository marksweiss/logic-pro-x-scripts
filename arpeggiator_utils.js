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