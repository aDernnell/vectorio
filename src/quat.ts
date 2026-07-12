

export class Quaternion extends Array<number> {
    static readonly IDENTITY: Readonly<Quaternion> = new Quaternion(0, 0, 0, 1);

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
        super(x, y, z, w);
    }

}