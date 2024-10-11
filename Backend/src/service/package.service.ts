import { Package } from "../models/package";

export const deletePc = async (id: number) => {
    const deletedPackage = await Package.findByIdAndDelete(id);

    if (!deletedPackage) {
        return false
    }

    return true;

}
