export {};
interface Client {
    a: () => string;
}
declare global {
    interface Window {
        client: Client;
        getCLodop(): any;
    }
}
