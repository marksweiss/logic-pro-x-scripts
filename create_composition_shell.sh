#!/bin/bash

# Check if a composition name was provided
if [ $# -eq 0 ]; then
    echo "Error: Please provide a composition name"
    echo "Usage: ./create_composition_shell.sh <composition_name>"
    exit 1
fi

# Convert the composition name to snake case
COMP_NAME=$(echo "$1" | sed 's/\([a-z0-9]\)\([A-Z]\)/\1_\2/g' | tr '[:upper:]' '[:lower:]')
OUTPUT_FILE="compositions/${COMP_NAME}.js"

# Create the output file
echo "// Generated composition file for $1" > "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Include library files in correct order
cat lib/logic_utils.js >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
cat lib/composition_utils.js >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
cat lib/chord_utils.js >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
cat lib/parameter_utils.js >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
cat lib/arpeggiator_utils.js >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Add empty Initialize and HandleMIDI functions
cat << 'EOF' >> "$OUTPUT_FILE"

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
EOF

echo "Created new composition file: $OUTPUT_FILE" 