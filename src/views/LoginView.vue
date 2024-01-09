<template>
    <div></div>
        <div id="main-wrapper" class="container">
            <div class="row justify-content-center">
                <div class="col-xl-10">
                    <div class="card border-0">
                        <div class="card-body p-0">
                            <div class="row no-gutters">
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <a href="/">
                                            <i class="fas fa-arrow-left"></i> Go Back
                                        </a>
                                        <div class="mb-5">
                                            <h3 class="h4 font-weight-bold text-theme">Login</h3>
                                        </div>
                                        <h6 class="h5 mb-0">Welcome to Resonance!</h6>
                                        <p class="text-muted mt-2 mb-5">Enter your email address and password to continue.</p>
                                        <p class="text-danger mt-2 mb-5" v-if="flag">{{ message }}</p>

                                        <form @submit.prevent="login">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Email address</label>
                                                <input type="email" class="form-control" id="exampleInputEmail1"
                                                    v-model="email">
                                            </div>
                                            <div class="form-group mb-5">
                                                <label for="exampleInputPassword1">Password</label>
                                                <input type="password" class="form-control" id="exampleInputPassword1"
                                                    v-model="password">
                                            </div>
                                            <button type="submit" class="btn btn-theme">Login</button>
                                            
                                        </form>
                                        <br>
                                        <a @click="google" class="btn btn-light btn-lg btn-block" href="https://resonance-j0mg.onrender.com/google_login">
        <i class="fab fa-google mr-2"></i> Sign in with Google
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-6 d-none d-lg-inline-block">
                                    <div class="account-block rounded-right">
                                        <div class="overlay rounded-right"></div>
                                        <div class="account-testimonial">
                                            <p class="lead text-white">.</p>
                                            <h3 class="text-white mb-4 text-right"></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <p class="text-muted text-center mt-3 mb-0">Don't have an account? <a href="/register"
                            class="text-primary ml-1">register</a></p>

                </div>

            </div>

        </div>
</template>

<script>
import axios from '../axios';
export default {
    name: 'loginView',
    data() {
        return {
            email: "",
            password: "",
            message : "",
            flag : false
        }
    },
    methods: {
    async google(){
       const response = await axios.get('google_login')
       localStorage.setItem('token', response.data.access_token);
       this.$router.push('/');

    },
        async login() {
            try {
                const data = {
                    email: this.email,
                    password: this.password
                };

                const response = await axios.post('login', data);
                if (response.data.error){
                this.flag = true
                this.message = response.data.message,
                setTimeout(() => {
                    this.flag = false
                },4000);
                
               }
               
                console.log("User loggedIn", response);

                this.$router.push('/');
                localStorage.setItem('token', response.data.access_token);
            } catch (error) {
                // Handle the error here
                this.flag = true
                this.message = "Invalid Credentials",
                setTimeout(() => {
                    this.flag = false
                },4000);
                console.log(error)
                // You can also show an error message to the user if needed
                // For example: this.errorMessage = 'Login failed. Please try again.';
            }
        }

    }
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css');

a {
    text-decoration: none;
    color: inherit;
}

body {
    margin-top: 20px;
    background: #f6f9fc;
}

.account-block {
    padding: 0;
    background-image: url('../assets/_777defbb-1d46-44bb-98aa-3da04534746f.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    position: relative;
}

.account-block .overlay {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
}

.account-block .account-testimonial {
    text-align: center;
    color: #fff;
    position: absolute;
    margin: 0 auto;
    padding: 0 1.75rem;
    bottom: 3rem;
    left: 0;
    right: 0;
}

.text-theme {
    color: #5369f8 !important;
}

.btn-theme {
    background-color: #5369f8;
    border-color: #5369f8;
    color: #fff;
}

/* Remove the light blue outline on focus for textarea */
.form-control:focus {
    color: inherit;
    /* Use the default text color */
    background-color: #fff;
    /* Use the default background color */
    border-color: #ced4da;
    /* Use a neutral border color */
    outline: none;
    /* Remove the outline */
    box-shadow: none;
    /* Remove the box shadow */
}</style>
