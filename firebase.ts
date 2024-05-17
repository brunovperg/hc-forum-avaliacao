import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBao7CDAAqLb3mSnLxOU54D4Nr6ANRsv8I',

	authDomain: 'forms-hc.firebaseapp.com',

	projectId: 'forms-hc',

	storageBucket: 'forms-hc.appspot.com',

	messagingSenderId: '156668714698',

	appId: '1:156668714698:web:590c576de7d44e03829e33',
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
