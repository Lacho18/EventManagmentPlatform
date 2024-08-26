import { createSlice } from '@reduxjs/toolkit';

const themeColorSlice = createSlice({
    name: 'themeColor',
    initialState: {
        sideWindow: false,
        color: {
            color: 'gray',
            easyColor: 'rgb(248,250,252)',
            lightColor: 'rgb(241,245,249)',
            hardColor: 'rgb(148,163,184)',
            heavyColor: 'rgb(71,85,105)',
        },
        //options: ['gray', 'white', 'black', 'purple', 'green', 'pink'],
        options: [{
            color: 'gray',
            easyColor: 'rgb(248,250,252)',
            lightColor: 'rgb(241,245,249)',
            hardColor: 'rgb(148,163,184)',
            heavyColor: 'rgb(71,85,105)',
        },
        {
            color: 'white',
            easyColor: 'rgb(209, 209, 209)',
            lightColor: 'rgb(227, 227, 227)',
            hardColor: 'rgb(245, 245, 245)',
            heavyColor: 'rgb(255, 255, 255)',
        },
        {
            color: 'black',
            easyColor: 'rgb(61, 61, 61)',
            lightColor: 'rgb(43, 43, 43)',
            hardColor: 'rgb(20, 20, 20)',
            heavyColor: 'rgb(0, 0, 0)',
        },
        {
            color: 'purple',
            easyColor: 'rgb(250,245,255)',
            lightColor: 'rgb(243,232,255)',
            hardColor: 'rgb(192,132,252)',
            heavyColor: 'rgb(147,51,234)',
        },
        {
            color: 'green',
            easyColor: 'rgb(236,253,245)',
            lightColor: 'rgb(209,250,229)',
            hardColor: 'rgb(52,211,153)',
            heavyColor: 'rgb(5,150,105)',
        },
        {
            color: 'pink',
            easyColor: 'rgb(253,242,248)',
            lightColor: 'rgb(252,231,243)',
            hardColor: 'rgb(244,114,182)',
            heavyColor: 'rgb(219,39,119)',
        }
        ],
    },
    reducers: {
        toggleWindow: (state) => {
            state.sideWindow = !state.sideWindow;
        },
        changeColor: (state, action) => {
            console.log("EHOOOO");
            let selectedColor = state.options.find(option => option.color === action.payload.selection);
            console.log(selectedColor);

            state.color = selectedColor;
        }
    }
});

export const { toggleWindow, changeColor } = themeColorSlice.actions;
export default themeColorSlice.reducer;