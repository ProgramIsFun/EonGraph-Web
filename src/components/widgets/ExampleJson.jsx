import React, { useState, useEffect } from 'react';
import Colorful from '@uiw/react-color-colorful';
import JsonView from '@uiw/react-json-view';

const object = {
    avatar: 'https://i.imgur.com/MK3eW3As.jpg',
    string: 'Lorem ipsum dolor sit amet',
    integer: 42,
    float: 114.514,
    bigint: 10086n,
    null: null,
    undefined,
    timer: 0,
    nan: NaN,
    url: new URL('https://example.com'),
    date: new Date('Tue Sep 13 2022 14:07:44 GMT-0500 (Central Daylight Time)'),
    array: [19, 100.86, 'test', NaN, Infinity],
    nestedArray: [
        [1, 2],
        [3, 4],
    ],
    object: {
        'first-child': true,
        'second-child': false,
        'last-child': null,
    },
    string_number: '1234',
}
const customTheme = {
    '--w-rjv-color': '#9cdcfe',
    '--w-rjv-key-number': '#268bd2',
    '--w-rjv-key-string': '#9cdcfe',
    '--w-rjv-background-color': '#1e1e1e',
    '--w-rjv-line-color': '#36334280',
    '--w-rjv-arrow-color': '#838383',
    '--w-rjv-edit-color': '#9cdcfe',
    '--w-rjv-info-color': '#9c9c9c7a',
    '--w-rjv-update-color': '#9cdcfe',
    '--w-rjv-copied-color': '#9cdcfe',
    '--w-rjv-copied-success-color': '#28a745',

    '--w-rjv-curlybraces-color': '#d4d4d4',
    '--w-rjv-colon-color': '#d4d4d4',
    '--w-rjv-brackets-color': '#d4d4d4',
    '--w-rjv-ellipsis-color': '#cb4b16',
    '--w-rjv-quotes-color': '#9cdcfe',
    '--w-rjv-quotes-string-color': '#ce9178',

    '--w-rjv-type-string-color': '#ce9178',
    '--w-rjv-type-int-color': '#b5cea8',
    '--w-rjv-type-float-color': '#b5cea8',
    '--w-rjv-type-bigint-color': '#b5cea8',
    '--w-rjv-type-boolean-color': '#569cd6',
    '--w-rjv-type-date-color': '#b5cea8',
    '--w-rjv-type-url-color': '#3b89cf',
    '--w-rjv-type-null-color': '#569cd6',
    '--w-rjv-type-nan-color': '#859900',
    '--w-rjv-type-undefined-color': '#569cd6',
};

export default function Demo() {
    const [cssvar, setCssvar] = useState('--w-rjv-background-color');
    const [hex, setHex] = useState("#1e1e1e");
    const [editable, setEditable] = useState(true);
    const [theme, setTheme] = useState(customTheme);
    const onChange = ({ hexa }) => {
        setHex(hexa);
        setTheme({ ...theme, [cssvar]: hexa });
    };

    const [src, setSrc] = useState({ ...object })
    useEffect(() => {
        const loop = () => {
            setSrc(src => ({
                ...src,
                timer: src.timer + 1
            }))
        }
        const id = setInterval(loop, 1000)
        return () => clearInterval(id)
    }, []);

    const changeEditable = (evn) => setEditable(evn.target.checked);
    return (
        <React.Fragment>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <JsonView
                    editable={editable}
                    value={src}
                    keyName="root"
                    style={{ flex: 1, overflow: 'auto', ...theme }}
                />
                <div>
                    {/*<Colorful color={hex} onChange={onChange} />*/}
                    <div style={{ display: 'flex', gap: '0.4rem', flexDirection: 'column', ...customTheme }}>
                        {Object.keys(customTheme).map((varname, idx) => {
                            const click = () => {
                                setCssvar(varname);
                                setHex(customTheme[varname]);
                            };
                            const active = cssvar === varname ? '#a8a8a8' : '';
                            return (
                                <button key={idx}
                                        style={{ background: active, border: 0,boxShadow: 'inset 0px 0px 1px #000', display: 'flex', alignItems: 'center', gap: 5, padding: '1px 3px' }}
                                        onClick={click}
                                >
                                    <span style={{ display: 'inline-block', width: 12, height: 12, background: `var(${varname})` }}></span>
                                    {varname}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div>
                Copy the theme configuration below into your project.
            </div>
            <pre style={{ padding: 10 }}>
        {JSON.stringify(theme, null, 2)}
      </pre>
        </React.Fragment>
    );
}
