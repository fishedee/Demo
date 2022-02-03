class LodopError extends Error {
    public constructor(msg: string) {
        super(msg);
    }
}
class LodopLoadingError extends LodopError {
    public constructor(msg: string) {
        super(msg);
    }
}

class LodopNotInstallError extends LodopError {
    public constructor(msg: string) {
        super(msg);
    }
}

export {
    LodopError,
    LodopLoadingError,
    LodopNotInstallError,
}