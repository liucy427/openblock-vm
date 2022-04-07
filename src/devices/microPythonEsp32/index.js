const formatMessage = require('format-message');

const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const ProgramModeType = require('../../extension-support/program-mode-type');

const CommonPeripheral = require('../common/common-peripheral');

/**
 * The list of USB device filters.
 * @readonly
 */
const PNPID_LIST = [
    // CH340
    'USB\\VID_1A86&PID_7523',
    // CH9102
    'USB\\VID_1A86&PID_55D4',
    // CP2102
    'USB\\VID_10C4&PID_EA60'
];

/**
 * Configuration of serialport
 * @readonly
 */
const SERIAL_CONFIG = {
    baudRate: 57600,
    dataBits: 8,
    stopBits: 1,
    hupcl: false
};

/**
 * Configuration for esptool
 * @readonly
 */
const DIVECE_OPT = {
    type: 'microPython',
    chip: 'esp32',
    baud: '921600',
    firmware: 'esp32-20220117-v1.18.bin'
};

const Pins = {
    IO0: '0',
    IO1: '1',
    IO2: '2',
    IO3: '3',
    IO4: '4',
    IO5: '5',
    IO6: '6',
    IO7: '7',
    IO8: '8',
    IO9: '9',
    IO10: '10',
    IO11: '11',
    IO12: '12',
    IO13: '13',
    IO14: '14',
    IO15: '15',
    IO16: '16',
    IO17: '17',
    IO18: '18',
    IO19: '19',
    IO21: '21',
    IO22: '22',
    IO23: '23',
    IO25: '25',
    IO26: '26',
    IO27: '27',
    IO32: '32',
    IO33: '33',
    IO34: '34',
    IO35: '35',
    IO36: '36',
    IO39: '39'
};

const Level = {
    High: '1',
    Low: '0'
};

const Eol = {
    Warp: 'warp',
    NoWarp: 'noWarp'
};

const Mode = {
    Input: 'IN',
    Output: 'OUT',
    InputPullup: 'PULL_UP',
    InputPulldown: 'PULL_DOWN'
};

const InterrupMode = {
    Rising: 'RISING',
    Falling: 'FALLING',
    Change: 'CHANGE',
    LowLevel: 'LOW_LEVEL',
    HighLevel: 'HIGH_LEVEL'
};

/**
 * Manage communication with a MicroPython esp32 peripheral over a OpenBlock Link client socket.
 */
class MicroPythonEsp32 extends CommonPeripheral{
    /**
     * Construct a MicroPython communication object.
     * @param {Runtime} runtime - the OpenBlock runtime
     * @param {string} deviceId - the id of the extension
     * @param {string} originalDeviceId - the original id of the peripheral, like xxx_arduinoUno
     */
    constructor (runtime, deviceId, originalDeviceId) {
        super(runtime, deviceId, originalDeviceId, PNPID_LIST, SERIAL_CONFIG, DIVECE_OPT);
    }
}

/**
 * OpenBlock blocks to interact with a MicroPython esp32 peripheral.
 */
class OpenBlockMicroPythonEsp32Device {
    /**
     * @return {string} - the ID of this extension.
     */
    static get DEVICE_ID () {
        return 'microPythonEsp32';
    }

    get PINS_MENU () {
        return [
            {
                text: 'IO0',
                value: Pins.IO0
            },
            // Used by REPL port
            // {
            //     text: 'IO1',
            //     value: Pins.IO1
            // },
            {
                text: 'IO2',
                value: Pins.IO2
            },
            // Used by REPL port
            // {
            //     text: 'IO3',
            //     value: Pins.IO3
            // },
            {
                text: 'IO4',
                value: Pins.IO4
            },
            {
                text: 'IO5',
                value: Pins.IO5
            },
            // Pins 6 to 11 are used by the ESP32 Flash, not recommended for general use.
            // {
            //     text: 'IO6',
            //     value: Pins.IO6
            // },
            // {
            //     text: 'IO7',
            //     value: Pins.IO7
            // },
            // {
            //     text: 'IO8',
            //     value: Pins.IO8
            // },
            // {
            //     text: 'IO9',
            //     value: Pins.IO9
            // },
            // {
            //     text: 'IO10',
            //     value: Pins.IO10
            // },
            // {
            //     text: 'IO11',
            //     value: Pins.IO11
            // },
            {
                text: 'IO12',
                value: Pins.IO12
            },
            {
                text: 'IO13',
                value: Pins.IO13
            },
            {
                text: 'IO14',
                value: Pins.IO14
            },
            {
                text: 'IO15',
                value: Pins.IO15
            },
            {
                text: 'IO16',
                value: Pins.IO16
            },
            {
                text: 'IO17',
                value: Pins.IO17
            },
            {
                text: 'IO18',
                value: Pins.IO18
            },
            {
                text: 'IO19',
                value: Pins.IO19
            },
            {
                text: 'IO21',
                value: Pins.IO21
            },
            {
                text: 'IO22',
                value: Pins.IO22
            },
            {
                text: 'IO23',
                value: Pins.IO23
            },
            {
                text: 'IO25',
                value: Pins.IO25
            },
            {
                text: 'IO26',
                value: Pins.IO26
            },
            {
                text: 'IO27',
                value: Pins.IO27
            },
            {
                text: 'IO32',
                value: Pins.IO32
            },
            {
                text: 'IO33',
                value: Pins.IO33
            },
            {
                text: 'IO34',
                value: Pins.IO34
            },
            {
                text: 'IO35',
                value: Pins.IO35
            },
            {
                text: 'IO36',
                value: Pins.IO36
            },
            {
                text: 'IO39',
                value: Pins.IO39
            }
        ];
    }

    get OUT_PINS_MENU () {
        return [
            {
                text: 'IO0',
                value: Pins.IO0
            },
            // Used by REPL port
            // {
            //     text: 'IO1',
            //     value: Pins.IO1
            // },
            {
                text: 'IO2',
                value: Pins.IO2
            },
            // Used by REPL port
            // {
            //     text: 'IO3',
            //     value: Pins.IO3
            // },
            {
                text: 'IO4',
                value: Pins.IO4
            },
            {
                text: 'IO5',
                value: Pins.IO5
            },
            // Pins 6 to 11 are used by the ESP32 Flash, not recommended for general use.
            // {
            //     text: 'IO6',
            //     value: Pins.IO6
            // },
            // {
            //     text: 'IO7',
            //     value: Pins.IO7
            // },
            // {
            //     text: 'IO8',
            //     value: Pins.IO8
            // },
            // {
            //     text: 'IO9',
            //     value: Pins.IO9
            // },
            // {
            //     text: 'IO10',
            //     value: Pins.IO10
            // },
            // {
            //     text: 'IO11',
            //     value: Pins.IO11
            // },
            {
                text: 'IO12',
                value: Pins.IO12
            },
            {
                text: 'IO13',
                value: Pins.IO13
            },
            {
                text: 'IO14',
                value: Pins.IO14
            },
            {
                text: 'IO15',
                value: Pins.IO15
            },
            {
                text: 'IO16',
                value: Pins.IO16
            },
            {
                text: 'IO17',
                value: Pins.IO17
            },
            {
                text: 'IO18',
                value: Pins.IO18
            },
            {
                text: 'IO19',
                value: Pins.IO19
            },
            {
                text: 'IO21',
                value: Pins.IO21
            },
            {
                text: 'IO22',
                value: Pins.IO22
            },
            {
                text: 'IO23',
                value: Pins.IO23
            },
            {
                text: 'IO25',
                value: Pins.IO25
            },
            {
                text: 'IO26',
                value: Pins.IO26
            },
            {
                text: 'IO27',
                value: Pins.IO27
            },
            {
                text: 'IO32',
                value: Pins.IO32
            },
            {
                text: 'IO33',
                value: Pins.IO33
            }
        ];
    }

    get MODE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'microPythonEsp32.modeMenu.input',
                    default: 'input',
                    description: 'label for input pin mode'
                }),
                value: Mode.Input
            },
            {
                text: formatMessage({
                    id: 'microPythonEsp32.modeMenu.output',
                    default: 'output',
                    description: 'label for output pin mode'
                }),
                value: Mode.Output
            },
            {
                text: formatMessage({
                    id: 'microPythonEsp32.modeMenu.inputPullup',
                    default: 'input-pullup',
                    description: 'label for input-pullup pin mode'
                }),
                value: Mode.InputPullup
            },
            {
                text: formatMessage({
                    id: 'microPythonEsp32.modeMenu.inputPulldown',
                    default: 'input-pulldown',
                    description: 'label for input-pulldown pin mode'
                }),
                value: Mode.InputPulldown
            }
        ];
    }

    get ANALOG_PINS_MENU () {
        return [
            // Since wifi is enabled by default, none of the pins of ADC block 2 can use the ADC function
            // {
            //     text: 'IO0',
            //     value: Pins.IO0
            // },
            // {
            //     text: 'IO2',
            //     value: Pins.IO2
            // },
            // {
            //     text: 'IO4',
            //     value: Pins.IO4
            // },
            // {
            //     text: 'IO12',
            //     value: Pins.IO12
            // },
            // {
            //     text: 'IO13',
            //     value: Pins.IO13
            // },
            // {
            //     text: 'IO14',
            //     value: Pins.IO14
            // },
            // {
            //     text: 'IO15',
            //     value: Pins.IO15
            // },
            // {
            //     text: 'IO25',
            //     value: Pins.IO25
            // },
            // {
            //     text: 'IO26',
            //     value: Pins.IO26
            // },
            // {
            //     text: 'IO27',
            //     value: Pins.IO27
            // },
            {
                text: 'IO32',
                value: Pins.IO32
            },
            {
                text: 'IO33',
                value: Pins.IO33
            },
            {
                text: 'IO34',
                value: Pins.IO34
            },
            {
                text: 'IO35',
                value: Pins.IO35
            },
            {
                text: 'IO36',
                value: Pins.IO36
            },
            {
                text: 'IO39',
                value: Pins.IO39
            }
        ];
    }

    get LEVEL_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'microPythonEsp32.levelMenu.high',
                    default: 'high',
                    description: 'label for high level'
                }),
                value: Level.High
            },
            {
                text: formatMessage({
                    id: 'microPythonEsp32.levelMenu.low',
                    default: 'low',
                    description: 'label for low level'
                }),
                value: Level.Low
            }
        ];
    }

    get DAC_PINS_MENU () {
        return [
            {
                text: 'IO25',
                value: Pins.IO25
            },
            {
                text: 'IO26',
                value: Pins.IO26
            }
        ];
    }

    get TOUCH_PINS_MENU () {
        return [
            {
                text: 'IO0',
                value: Pins.IO0
            },
            {
                text: 'IO2',
                value: Pins.IO2
            },
            {
                text: 'IO4',
                value: Pins.IO4
            },
            {
                text: 'IO12',
                value: Pins.IO12
            },
            {
                text: 'IO13',
                value: Pins.IO13
            },
            {
                text: 'IO14',
                value: Pins.IO14
            },
            {
                text: 'IO15',
                value: Pins.IO15
            },
            {
                text: 'IO27',
                value: Pins.IO27
            },
            {
                text: 'IO32',
                value: Pins.IO32
            },
            {
                text: 'IO33',
                value: Pins.IO33
            }
        ];
    }

    get INTERRUP_MODE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'microPythonEsp32.InterrupModeMenu.risingEdge',
                    default: 'rising edge',
                    description: 'label for rising edge interrup'
                }),
                value: InterrupMode.Rising
            },
            {
                text: formatMessage({
                    id: 'microPythonEsp32.InterrupModeMenu.fallingEdge',
                    default: 'falling edge',
                    description: 'label for falling edge interrup'
                }),
                value: InterrupMode.Falling
            },
            {
                text: formatMessage({
                    id: 'microPythonEsp32.InterrupModeMenu.changeEdge',
                    default: 'change edge',
                    description: 'label for change edge interrup'
                }),
                value: InterrupMode.Change
            },
            {
                text: formatMessage({
                    id: 'microPythonEsp32.InterrupModeMenu.low',
                    default: 'low level',
                    description: 'label for low level interrup'
                }),
                value: InterrupMode.LowLevel
            },
            {
                text: formatMessage({
                    id: 'microPythonEsp32.InterrupModeMenu.high',
                    default: 'high level',
                    description: 'label for high level interrup'
                }),
                value: InterrupMode.HighLevel
            }
        ];
    }

    get EOL_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'microPythonEsp32.eolMenu.warp',
                    default: 'warp',
                    description: 'label for warp print'
                }),
                value: Eol.Warp
            },
            {
                text: formatMessage({
                    id: 'microPythonEsp32.eolMenu.noWarp',
                    default: 'no-warp',
                    description: 'label for no warp print'
                }),
                value: Eol.NoWarp
            }
        ];
    }

    /**
     * Construct a set of MicroPython blocks.
     * @param {Runtime} runtime - the OpenBlock runtime.
     * @param {string} originalDeviceId - the original id of the peripheral, like xxx_arduinoUno
     */
    constructor (runtime, originalDeviceId) {
        /**
         * The OpenBlock runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        // Create a new MicroPython esp32 peripheral instance
        this._peripheral = new MicroPythonEsp32(this.runtime,
            OpenBlockMicroPythonEsp32Device.DEVICE_ID, originalDeviceId);
    }

    /**
     * @returns {Array.<object>} metadata for this extension and its blocks.
     */
    getInfo () {
        return [
            {
                id: 'pin',
                name: formatMessage({
                    id: 'microPythonEsp32.category.pins',
                    default: 'Pins',
                    description: 'The name of the esp32 microPython device pin category'
                }),
                color1: '#4C97FF',
                color2: '#3373CC',
                color3: '#3373CC',

                blocks: [
                    {
                        opcode: 'esp32InitPinMode',
                        text: formatMessage({
                            id: 'microPythonEsp32.pins.esp32InitPinMode',
                            default: 'set pin [PIN] mode [MODE]',
                            description: 'microPythonEsp32 set pin mode'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'outPins',
                                defaultValue: Pins.IO2
                            },
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: 'mode',
                                defaultValue: Mode.Input
                            }
                        }
                    },
                    {
                        opcode: 'esp32SetDigitalOutput',
                        text: formatMessage({
                            id: 'microPythonEsp32.pins.esp32SetDigitalOutput',
                            default: 'set digital pin [PIN] out [LEVEL]',
                            description: 'microPythonEsp32 set digital pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'outPins',
                                defaultValue: Pins.IO2
                            },
                            LEVEL: {
                                type: ArgumentType.STRING,
                                menu: 'level',
                                defaultValue: Level.High
                            }
                        }
                    },
                    {
                        opcode: 'esp32SetPwmOutput',
                        text: formatMessage({
                            id: 'microPythonEsp32.pins.esp32SetPwmOutput',
                            default: 'set pwm pin [PIN] out [OUT]',
                            description: 'microPythonEsp32 set pwm pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'outPins',
                                defaultValue: Pins.IO2
                            },
                            OUT: {
                                type: ArgumentType.UINT10_NUMBER,
                                defaultValue: '0'
                            }
                        }
                    },
                    {
                        opcode: 'esp32SetDACOutput',
                        text: formatMessage({
                            id: 'microPythonEsp32.pins.esp32SetDACOutput',
                            default: 'set dac pin [PIN] out [OUT]',
                            description: 'microPythonEsp32 set dac pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'dacPins',
                                defaultValue: Pins.IO25
                            },
                            OUT: {
                                type: ArgumentType.UINT8_NUMBER,
                                defaultValue: '0'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'esp32ReadDigitalPin',
                        text: formatMessage({
                            id: 'microPythonEsp32.pins.esp32ReadDigitalPin',
                            default: 'read digital pin [PIN]',
                            description: 'microPythonEsp32 read digital pin'
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: Pins.IO2
                            }
                        }
                    },
                    {
                        opcode: 'esp32ReadAnalogPin',
                        text: formatMessage({
                            id: 'microPythonEsp32.pins.esp32ReadAnalogPin',
                            default: 'read analog pin [PIN]',
                            description: 'microPythonEsp32 read analog pin'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'analogPins',
                                defaultValue: Pins.IO2
                            }
                        }
                    },
                    {
                        opcode: 'esp32ReadTouchPin',
                        text: formatMessage({
                            id: 'microPythonEsp32.pins.esp32ReadTouchPin',
                            default: 'read touch pin [PIN]',
                            description: 'microPythonEsp32 read touch pin'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'touchPins',
                                defaultValue: Pins.IO2
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'esp32SetServoOutput',
                        text: formatMessage({
                            id: 'microPythonEsp32.pins.setServoOutput',
                            default: 'set servo pin [PIN] out [OUT]',
                            description: 'microPythonEsp32 set servo pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'outPins',
                                defaultValue: Pins.IO2
                            },
                            OUT: {
                                type: ArgumentType.ANGLE,
                                defaultValue: '90'
                            }
                        }
                    },
                    '---',
                    {

                        opcode: 'esp32AttachInterrupt',
                        text: formatMessage({
                            id: 'microPythonEsp32.pins.esp32AttachInterrupt',
                            default: 'attach interrupt pin [PIN] mode [MODE] executes',
                            description: 'microPythonEsp32 attach interrupt'
                        }),
                        blockType: BlockType.CONDITIONAL,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: Pins.IO2
                            },
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: 'interruptMode',
                                defaultValue: InterrupMode.Rising
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    }
                ],
                menus: {
                    pins: {
                        items: this.PINS_MENU
                    },
                    outPins: {
                        items: this.OUT_PINS_MENU
                    },
                    mode: {
                        items: this.MODE_MENU
                    },
                    level: {
                        acceptReporters: true,
                        items: this.LEVEL_MENU
                    },
                    dacPins: {
                        items: this.DAC_PINS_MENU
                    },
                    analogPins: {
                        items: this.ANALOG_PINS_MENU
                    },
                    touchPins: {
                        items: this.TOUCH_PINS_MENU
                    },
                    interruptMode: {
                        items: this.INTERRUP_MODE_MENU
                    }
                }
            },
            {
                id: 'console',
                name: formatMessage({
                    id: 'microPythonEsp32.category.console',
                    default: 'Console',
                    description: 'The name of the esp32 microPython device console category'
                }),
                color1: '#FF3399',
                color2: '#CC297A',
                color3: '#CC297A',

                blocks: [
                    {
                        opcode: 'consolePrint',
                        text: formatMessage({
                            id: 'microPythonEsp32.console.consolePrint',
                            default: 'print [TEXT] [EOL]',
                            description: 'MicrpPython console print'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            TEXT: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Hello OpenBlock'
                            },
                            EOL: {
                                type: ArgumentType.STRING,
                                menu: 'eol',
                                defaultValue: Eol.Warp
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'consoleInput',
                        text: formatMessage({
                            id: 'microPythonEsp32.console.consoleInput',
                            default: 'prompt [TEXT] and read input',
                            description: 'MicrpPython console input'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            TEXT: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Input a number:'
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    }
                ],
                menus: {
                    eol: {
                        items: this.EOL_MENU
                    }
                }
            }
        ];
    }

    /**
     * Set pin mode.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set pin mode is done.
     */
    esp32InitPinMode (args) {
        this._peripheral.esp32InitPinMode(args.PIN, args.MODE);
        return Promise.resolve();
    }

    /**
     * Set pin digital out level.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set pin digital out level is done.
     */
    esp32SetDigitalOutput (args) {
        this._peripheral.esp32SetDigitalOutput(args.PIN, args.LEVEL);
        return Promise.resolve();
    }

    /**
     * Set pin pwm out value.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set pin pwm out value is done.
     */
    esp32SetPwmOutput (args) {
        this._peripheral.esp32SetPwmOutput(args.PIN, args.OUT);
        return Promise.resolve();
    }

    /**
     * Set dac pin out value.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set dac pin out value is done.
     */
    esp32SetDACOutput (args) {
        this._peripheral.esp32SetDACOutput(args.PIN, args.OUT);
        return Promise.resolve();
    }

    /**
     * Read pin digital level.
     * @param {object} args - the block's arguments.
     * @return {boolean} - true if read high level, false if read low level.
     */
    esp32ReadDigitalPin (args) {
        return this._peripheral.esp32ReadDigitalPin(args.PIN);
    }

    /**
     * Read analog pin.
     * @param {object} args - the block's arguments.
     * @return {number} - analog value fo the pin.
     */
    esp32ReadAnalogPin (args) {
        return this._peripheral.esp32ReadAnalogPin(args.PIN);
    }

    /**
     * Read touch pin.
     * @param {object} args - the block's arguments.
     * @return {number} - read value of touch pin.
     */
    esp32ReadTouchPin (args) {
        return this._peripheral.esp32ReadTouchPin(args.PIN);
    }

    /**
     * Set servo out put.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set servo out value is done.
     */
    esp32SetServoOutput (args) {
        this._peripheral.esp32SetServoOutput(args.PIN, args.OUT);
        return Promise.resolve();
    }
}

module.exports = OpenBlockMicroPythonEsp32Device;
