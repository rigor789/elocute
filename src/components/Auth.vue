<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>
<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { config } from '../utils/firebaseConfig';
export default {
	name: 'auth',
	mounted() {
		var uiConfig = {
			signInSuccessUrl: '/success',
			signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
			//signInFlow: 'popup',
			credentialHelper: firebaseui.auth.CredentialHelper.NONE,
		};
		var ui = new firebaseui.auth.AuthUI(firebase.auth());
		ui.start('#firebaseui-auth-container', uiConfig);
	},
};
</script>