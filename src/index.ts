import { App } from './app';

const app = new App();

app.server.listen(3000, ()=>{
	console.log(`Server is running on port ${3000}`);
});