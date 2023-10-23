type ImageAsset = {
    _ref: string;
    _type: "reference";
};

export type ImageItem = {
    _key: string;
    _type: "image";
    asset: ImageAsset;
};
