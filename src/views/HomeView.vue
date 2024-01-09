<template>
    <header class="foi-header landing-header">
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light foi-navbar">
                <a class="navbar-brand" href="/">
                    <span class="material-symbols-outlined">
                        graphic_eq
                    </span>
                </a>

                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <div class="row">
                        <div class="col">
                            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                        </div>
                        <div class="col">
                            <a class="nav-link" href="/history">History</a>
                        </div>
                    </div>

                    <!-- <li class="nav-item">
                            <a class="nav-link" href="features.html">Features</a>
                        </li> -->

                </ul>
                <ul class="navbar-nav mt-2 mt-lg-0" v-if="!user">
                    <div class="row">
                        <div class="col">
                            <a id="signup-btn" class="btn btn-dark" href="/register">SignUp</a>
                        </div>
                        <div class="col">
                            <a class="btn btn-danger " id="login-btn" href="/login">Login</a>
                        </div>
                    </div>

                </ul>
                <ul class="navbar-nav mt-2 mt-lg-0" v-else>
                    <li class="nav-item">
                        <button @click="logout()" class="btn btn-light">Logout</button>
                    </li>
                </ul>

            </nav>
            <div class="header-content" v-if="!user">
                <div class="row">
                    <div class="col-md-6">
                        <h1 id="moving-text">
                            Transcribe!
                        </h1>
                        <p class="text-dark">Resonate with precision: Unlock the transformative power of Resonance.</p>
                        <a class="btn btn-primary mb-4" href="#recorder-section">Get Started</a>


                    </div>

                </div>
            </div>
        </div>
    </header>
    <div class="custom-container mt-5" v-if="!user">
        <p class="custom-lead">
            Experience <b>Resonance</b>, powered by <b>Whisper</b> from OpenAI. Whisper is trained on a large and diverse
            dataset of audio and text, and can perform various tasks such as transcribing speech in multiple languages,
            translating speech to English, identifying the language of speech, and detecting voice activity.
        </p>

        <div class="mt-3" id="custom-keyFeatures">
            <p class="custom-h5">Key Features:</p>
            <ul class="custom-ul">
                <li class="custom-li"><strong>Speech-to-Text:</strong> Accepts speech input and transcribes it any language
                    audio with <b>high accuracy</b>.
                </li>
                <li class="custom-li"><strong>Multilingual Translation:</strong> Automatically translates transcriptions to
                    English if the spoken language is different.</li>
                <li class="custom-li"><strong>Transcription History:</strong> All transcriptions are securely stored in a
                    database for your reference.</li>
                <li class="custom-li"><strong>Word Frequency Analysis:</strong> Gain insights into your communication
                    patterns with a table displaying the most frequently used words. Compare against global usage.</li>
                <li class="custom-li"><strong>Top 3 Unique Phrases:</strong> Identify and explore the most distinct phrases
                    spoken by you.</li>
                <li class="custom-li"><strong>Similarity Detector:</strong> Compare your speech with others to discover the
                    most similar users.</li>
            </ul>
        </div>
 <img src="https://images.openai.com/blob/29f82291-67a2-491f-b588-58d310d87318/asr-training-data-mobile.svg?width=10&amp;height=10&amp;quality=50" width="100%"  alt="ASR training data inputs and outputs" loading="lazy" data-nuxt-img="" sizes="(max-width: 744px) 100vw, (max-width: 1280px) 100vw, (max-width: 1440px) 100vw, 100vw" aria-hidden="false" class="w-full">    </div>


    <div class="container ">
        <section id="recorder-section">
            <div class="card" id="recorder">
                <div class="card-body">
                    
                    <!-- <div class="row" v-if="!user">
    
                 <div class="nav-item">
                            <a  href="/login">Login</a>
                        </div> to continue
                    </div> -->

                    <div id="typedtext"></div>
                    
                
                    <button @click="exampleClick()" v-if="clickFlag">click</button>
                    <div class="spinner-border" role="status" v-if="flag">
                        <span class="visually-hidden"></span>
                        

                    </div>
                    <span v-if="transcript" style="cursor: pointer;"  @click="copyToClipboard" class="material-symbols-outlined">
                        {{ buttonText }}
                    </span>

                    <audio ref="audioPlayer" :src="audioUrl"></audio>
                    <div class="row text-right">
                        <canvas ref="audioVisualizer" id="audio-visualization" width="300" height="50"></canvas>
                    </div>
                </div>
            </div>
        </section>

        <div class="buttons-container text-right">
            <label for="upload-button" class="btn btn-transparent">
                <input type="file" id="upload-button" accept="audio/*" @change="uploadFile" style="display: none" />
                <i class="fas fa-upload"></i>
                <span v-if="isUploaded" class="upload-indicator">
                    <i class="fas fa-check-circle" style="color: rgb(18, 227, 147);"></i> Uploaded {{
                        uploaded_file.slice(0, 15) }}.....
                </span>
            </label>
            <button @click="toggleRecording" class="btn btn-danger">
                <i :class="isRecording ? 'fas fa-record-vinyl' : 'fas fa-microphone'"></i>
                {{ btn }}
            </button>

            <button v-if="recorded" class="btn btn-primary" id="play-detected-language" @click="togglePlay">
                <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i> {{ isPlaying ? 'Pause' : 'Play' }}
            </button>

            <button v-if="recorded" class="btn btn-danger" @click="deleteRecording">
                <i class="fas fa-trash"></i> Delete
            </button>

            <button v-if="!isRecording && recorded && this.user" class="btn btn-primary" @click="transcribe">
                <i class="fas fa-file-alt"></i> Transcribe
            </button>
            <a v-if="!isRecording && recorded && this.user && this.transcripted" @click="handleAnalysis()"
                class="btn btn-success" id="play-detected-language" href="#analysis-section">
                <i class="fas fa-search"></i> Analyze
            </a>


        </div>
    </div>




    <section id="analysis-section" class="mt-4" v-if="analysis">
        <div class="container">
            <div class="card">
                <div class="card-body">
                    <h5>Text Analysis</h5>
                    <div>
                        <h6>Most Frequently Used Words</h6>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Word</th>
                                    <th>Frequency (Current User)</th>
                                    <th>Frequency (All Users)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="word in words" :key="word[0]">
                                    <td>{{ word }}</td>
                                    <td>{{ currentUserWordCounts[word] || 0 }}</td>
                                    <td>{{ allUsersWordCounts[word] || 0 }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-4">
                        <h6>Top 3 Unique Phrases</h6>
                        <ul>
                            <li v-for="phrase in top3Phrases" :key="phrase">{{ phrase }}</li>
                        </ul>
                    </div>
                    <div class="mt-4">
                        <h6>Most Similar Users</h6>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Similarity Score</th>
                                    <th>Transcription</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in mostSimilarUsers" :key="user.user_data.id">
                                    <td>{{ user.user_data.username }}</td>
                                    <td>{{ user.user_data.email }}</td>
                                    <td>{{ (user.similarity_score * 100).toFixed(2) }}%</td>
                                    <td>{{ user.transcription }}</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from '../axios';
import { mapGetters } from 'vuex'

export default {
    name: 'HomeView',
    data() {
        return {
            isRecording: false,
            audioUrl: null,
            chunks: [],
            mediaRecorder: null,
            audioBlob: null,
            transcript: '',
            language: '',
            currentUserWordCounts: [],
            allUsersWordCounts: [],
            words: '',
            top3Phrases: '',
            mostSimilarUsers: [],
            btn: 'Record',
            recorded: false,
            visualizationSetUp: false,
            isUploaded: false,
            isPlaying: false,
            uploaded_file: '',
            user: null,
            analysis: false,
            transcripted: false,
            aText: [],
            flag: false,
            clickFlag: false,
            textToCopy: "",
            buttonText: "content_copy",
            copied: false,




        };
    },
    async mounted() {
        this.movingText()
        try {
            const response = await axios.get('user')
            this.$store.dispatch('user', response.data.user)
            this.user = response.data.user
            this.typewriter(`👋 Welcome ${this.user.username} to the 🎵 Resonance. To get started, click on the 📤 Upload button or 🎙️ Record button to transcribe your text.`, 1)

        } catch (error) {
            console.log("Log In to continue")
            this.typewriter(`<a href="/login" style="text-decoration:green">Login</a>
                      to continue`,1)
        }

    },
    computed: {
        ...mapGetters(['isLoggedIn']),
    },
    methods: {
        copyToClipboard() {

            const textarea = document.createElement("textarea");
            textarea.value = this.textToCopy;
            document.body.appendChild(textarea);

            // Select the text in the textarea
            textarea.select();
            textarea.setSelectionRange(0, 99999); // For mobile devices

            // Copy the selected text to the clipboard
            document.execCommand("copy");

            // Remove the textarea from the document
            document.body.removeChild(textarea);

            // Update the button text and state
            this.buttonText = "done";
            this.copied = true;

            // Reset button text and state after a brief delay
            setTimeout(() => {
                this.buttonText = "content_copy";
                this.copied = false;
            }, 1500);
        },

        movingText() {
            let component = document.getElementById('moving-text');
            const list = ['Analyze!', 'Translate!', 'Compare!', 'Transcribe!'];
            let index = 0;
            function moveText() {
                // Get a random index from the list
                component.textContent = list[index];
                index = (index + 1) % list.length;
            }

            // Set an interval to update the text every 2000 milliseconds (2 seconds)
            setInterval(moveText, 2000);
        },
        exampleClick() {
            this.$router.push("/history")
            console.log("clicked")
        },

        togglePlay() {
            const audioElement = this.$refs.audioPlayer;
            this.setupAudioVisualizer()
            if (audioElement) {
                if (this.isPlaying) {
                    audioElement.pause();
                    this.typewriter("Paused ⏸️", 1)

                } else {
                    this.typewriter("Playing audio ▶️", 1)

                    audioElement.play();
                }

                // Toggle the play state
                this.isPlaying = !this.isPlaying;
            }
        },
        async toggleRecording() {
            if (!this.isRecording) {
                await this.startRecording();
            } else {
                await this.stopRecording();

            }
        },
        async startRecording() {
            this.btn = "Recording"
            this.chunks = [];
            await this.typewriter("recording ..... ⏸️", 0.5, () => { });
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(async (stream) => {
                    this.mediaRecorder = new MediaRecorder(stream);

                    this.mediaRecorder.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            this.chunks.push(event.data);
                        }
                    };

                    this.mediaRecorder.onstop = () => {
                        this.audioBlob = new Blob(this.chunks, { type: 'audio/mp3' });
                        this.audioUrl = URL.createObjectURL(this.audioBlob);
                        this.recorded = true;

                        // Set up audio visualizer
                        // this.setupAudioVisualizer();
                    };

                    this.mediaRecorder.start();
                    this.isRecording = true;

                })
                .catch((error) => {
                    console.error('Error accessing microphone:', error);
                });
        },
        async typewriter(text, speed = 100, callback = null) {
            this.aText.push(text);
            var iIndex;
            var iSpeed = speed; // time delay of print out
            if (this.aText.length === 0) {
                iIndex = 0
            } else {
                iIndex = this.aText.length - 1
            }
            var iArrLength = this.aText[0].length - 1; // the length of the text array
            var iScrollAt = 20; // start scrolling up at this many lines

            var iTextPos = 0; // initialise text position
            var sContents = ''; // initialise contents variable
            var iRow; // initialise current row

            const typeWriter = () => {
                sContents = ' ';
                iRow = Math.max(0, iIndex - iScrollAt);
                var destination = document.getElementById("typedtext");

                while (iRow < iIndex) {
                    sContents += this.aText[iRow++] + '<br />';
                }
                destination.innerHTML = sContents + this.aText[iIndex].substring(0, iTextPos + 1) + ".";
                if (iTextPos++ == iArrLength) {
                    iTextPos = 0;
                    iIndex++;
                    if (iIndex != this.aText.length) {
                        iArrLength = this.aText[iIndex].length;
                        setTimeout(typeWriter, 500);
                    } else {
                        // Animation completed, execute callback if provided
                        if (callback && typeof callback === 'function') {
                            callback();
                        }
                    }
                } else {
                    setTimeout(typeWriter, iSpeed);
                }
            }

            typeWriter();
        },

        setupAudioVisualizer() {
            if (!this.visualizationSetUp) {

                const audio = this.$refs.audioPlayer;
                const context = new (window.AudioContext || window.webkitAudioContext)();
                const analyser = context.createAnalyser();
                const source = context.createMediaElementSource(audio);
                source.connect(analyser);
                analyser.connect(context.destination);
                analyser.fftSize = 256;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                const canvas = this.$refs.audioVisualizer;
                const canvasCtx = canvas.getContext('2d');

                audio.play();

                const draw = () => {
                    const WIDTH = canvas.width;
                    const HEIGHT = canvas.height;

                    analyser.getByteFrequencyData(dataArray);

                    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

                    const barWidth = (WIDTH / bufferLength) * 2.5;
                    let barHeight;
                    let x = 0;

                    for (let i = 0; i < bufferLength; i++) {
                        barHeight = dataArray[i] / 2;

                        canvasCtx.fillStyle = 'rgba(' + (barHeight + 100) + ',50,50,0.5)';
                        canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

                        x += barWidth + 1;
                    }

                    requestAnimationFrame(draw);
                };

                draw();
                // Set the flag to indicate that visualization has been set up
                this.visualizationSetUp = true;
            }
        },



        async stopRecording() {
            this.mediaRecorder.stop();
            this.isRecording = false;
            this.btn = "Record";

            await this.typewriter("Recording completed ✅", 1);


        },

        logout() {
            localStorage.removeItem('token');
            this.$store.dispatch('user', null);
            this.$router.push('/#analysis-section');
            this.user = null;
            this.aText = []
            this.typewriter("Please login again to continue")
        },

        deleteRecording() {
            this.audioBlob = null;
            this.audioUrl = null;
            this.recorded = false;
            this.transcript = '';
            this.language = '';
            this.aText = [],
                this.uploaded_file = ''


        },

        async transcribe() {
            await this.sendAudio();
            this.transcripted = true
        },

        async sendAudio() {
            if (this.audioBlob) {
                this.typewriter("Sending audio to the server!", 1)
                const formData = new FormData();
                formData.append('audio', this.audioBlob);
                this.flag = true
                setTimeout(() => {
                    this.typewriter("Hold on processing ...... !", 1)

                }, 3000);
                await axios.post('processAudio', formData)
                    .then(async (response) => {
                        this.flag = false
                        // Handle the response (processed audio) as needed
                        await this.typewriter("Audio Processing Completed✅", 1)
                        // this.aText = []

                        this.transcript = response.data.translated_text;
                        this.language = response.data.language;
                        await this.typewriter(`${this.transcript} [${this.language}] `, 1);
                    
                        this.textToCopy = this.transcript
                    })
                    .catch(() => {
                        this.typewriter('Error sending audio to backend:', 1);
                    });
            } else {
                console.warn('No recorded audio to send.');
            }
        },
        uploadFile(event) {
            const fileInput = event.target;
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                this.audioBlob = new Blob([file], { type: 'audio/*' });
                this.audioUrl = URL.createObjectURL(this.audioBlob);
                this.recorded = true;
                this.isUploaded = true
                this.uploaded_file = file.name
                this.typewriter(`Uploaded ${file.name} `, 1)
                // this.sendAudioInternal(file);
            }
        },



        async sendAudioInternal(file) {
            const formData = new FormData();
            formData.append('audio', file);
            this.typewriter("Processing ...")
            this.flag = true;
            try {
                const response = await axios.post('processAudio', formData);
                // Handle the response (processed audio) as needed
                this.flag = false
                console.log('Processed audio received:', response.data);
                this.transcript = response.data.translated_text;
                this.aText = []
                this.typewriter(`${this.transcript} [${this.language}]`, 1);
                this.language = response.data.language;
                this.transcripted = true
                this.textToCopy = this.transcript

            } catch (error) {
                console.error('Error sending audio to backend:', error);
            }
        },

        async analyze() {
            const response = await axios.get('/word_frequencies');
            this.currentUserWordCounts = response.data.current_user_word_counts;
            this.allUsersWordCounts = response.data.all_users_word_counts;
            this.words = response.data.words;
            const response2 = await axios.get('/top_unique_phrases');
            this.top3Phrases = response2.data.top_unique_phrases;
            const response3 = await axios.post('/similar_users', { text: this.transcript });
            this.mostSimilarUsers = response3.data;
        },
       async handleAnalysis() {
            this.analysis = true;
            await this.analyze()
        }
    },
};
</script>

<style scoped>
@import url("../assets/css/style.css");
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

.custom-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.custom-lead {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    line-height: 1.6;
    letter-spacing: -0.02em;
    margin-bottom: 20px;
}

#custom-keyFeatures {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
}

.custom-h5 {
    font-size: 1.2rem;
    margin-bottom: 10px;
}

.custom-ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.custom-li {
    margin-bottom: 10px;
}

.typewriter h1 {
    overflow: hidden;
    /* Ensures the content is not revealed until the animation */
    border-right: .15em solid orange;
    /* The typwriter cursor */
    white-space: nowrap;
    /* Keeps the content on a single line */
    margin: 0 auto;
    /* Gives that scrolling effect as the typing happens */
    letter-spacing: .15em;
    /* Adjust as needed */
    animation:
        typing 3.5s steps(40, end),
        blink-caret .75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
    from {
        width: 0
    }

    to {
        width: 100%
    }
}

/* The typewriter cursor effect */
@keyframes blink-caret {

    from,
    to {
        border-color: transparent
    }

    50% {
        border-color: orange;
    }
}

#recorder {
    background-color: #22033e;
    color: white;
}

#recorder-section {
    margin-top: 30px;
    font-family: 'Source Code Pro', monospace;

}



@media (max-width: 767px) {

    .recorder {
        line-height: 75px;

        #upload-button {
            width: 100%;
            /* Make the button take up the full width of its container */


        }


    }

}

@media (min-width: 769px) and (max-width: 1200px) {

    #upload-button {
        width: 100%;
    }

    .recorder {
        line-height: 75px;

        #upload-button {
            width: 100%;
            /* Make the button take up the full width of its container */


        }

    }
}

.material-symbols-outlined {
    font-variation-settings:
        'FILL' 10,
        'wght' 400,
        'GRAD' 1,
        'opsz' 24;
    color: red;

}

.audio-container {
    display: flex;
    align-items: center;
}

/* Style for the audio controls */
audio {
    width: 100%;
    margin-right: 10px;
    /* Adjust as needed */
}
#signup-btn {
    padding: 5px;
}
#login-btn{
    padding:5px;
}
/* Style for the play button */
</style>
