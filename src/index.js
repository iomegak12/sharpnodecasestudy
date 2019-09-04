import { configuration } from "./config";
import { CustomerServiceHost } from "./hosting/customer-service-host";

class MainClass {
    static async main() {
        let host;

        const stopServer = () => {
            if (host) {
                host.stop()
                    .then(() => {
                        console.log('Host Stopped Successfully!');
                        process.exit();
                    });
            }
        };

        try {
            const hostConfiguration = configuration.getHostConfiguration();
            const portNumber = hostConfiguration.serverPort;

            host = new CustomerServiceHost(portNumber);
            await host.start();

            console.log('Host Started Successfully!');

            process.on('exit', stopServer);
            process.on('SIGINT', stopServer);
            process.on('SIGTERM', stopServer);
        } catch (error) {
            console.error(`Error Occurred, Details : ${JSON.stringify(error)}`);
        }
    }
}

MainClass.main();
