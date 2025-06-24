/*
    Apply dynamic functionality to the media player
    - Show playback controls when hovering over the window
    - Play/Pause the video
    - Mute/Unmute the sound
    - Control the volume via the slider
    - Go to a specific timestamp in the video with the video length slider
    - Fullscreen and minimize
*/

const media_player = document.querySelector("#media-player");
const video = document.querySelector("#video-element");
const playback_controls = document.querySelector<HTMLDivElement>("#playback-controls");

console.log(video);
console.log(media_player);

// When hovering over the media-player, we want to show the playback controls
// When leaving the media-player, we hide it.
media_player.addEventListener("mouseenter", (e) => {

    // Fade in the playback controls

    if (e.target instanceof HTMLDivElement){
        console.log("Hovering over media-player!");
        playback_fade("in");
    };
})

media_player.addEventListener("mouseleave", (e) => {

    // Fade out the playback controls

    if (e.target instanceof HTMLDivElement){
        console.log("Leaving media-player!");
        playback_fade("out");
    };
})

// This flag acts as a state machine, such that only one state can be active at a time.
// The playback-controls are either fading in or fading out, never both at once.
// Checks are made to this flag to stop fading in or fading out execution early.
let fade_flag = 0;
const playback_fade = (option : string) => {

    // Wack shit starts to happen when you have multiple
    // asynchrounous functions affecting the same element
    // Should always try to refer to the opacity on the element.
    const fade_in = () => {
        if (fade_flag == 0 && parseFloat(playback_controls.style.opacity) < 1){
            console.log("fading in");
            console.log((parseFloat(playback_controls.style.opacity) + 0.1).toString())

            playback_controls.style.opacity = (parseFloat(playback_controls.style.opacity) + 0.1).toString();
            setTimeout(fade_in, 10); // recursion type-shit
        }
    }

    const fade_out = () => {
        if (fade_flag == 1 && parseFloat(playback_controls.style.opacity) > 0){
            console.log("fading out");
            console.log((parseFloat(playback_controls.style.opacity) - 0.1).toString())

            playback_controls.style.opacity = (parseFloat(playback_controls.style.opacity) - 0.1).toString()
            setTimeout(fade_out, 10);
        }
    }

    if(option == "in"){
        fade_flag = 0;
        fade_in();
    }
    else if(option == "out"){
        fade_flag = 1;
        fade_out();
    }


}

