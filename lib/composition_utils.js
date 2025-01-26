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