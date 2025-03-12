import {config} from './config/config';
import {connectDB} from './config/database';
import {configureApp} from './config/app';

const app = configureApp();
const port = config.port;

app.listen(port, () => {
    console.log(`Server running on port ${port} in ${config.nodeEnv} mode`);
    connectDB();
});