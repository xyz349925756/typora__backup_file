"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateMasks = void 0;
const state_1 = require("./state");
exports.stateMasks = {
    [state_1.State.InlineCode]: ~15 /* Text */,
    [state_1.State.Math]: ~15 /* Text */,
    [state_1.State.BlockCodeBody]: ~15 /* Text */,
    [state_1.State.Emphasis]: ~19790543 /* Inline */ | 32768 /* Emphasis */,
    [state_1.State.Strong]: ~19790543 /* Inline */ | 16384 /* Strong */,
    [state_1.State.Strikethrough]: ~19790543 /* Inline */ | 8192 /* Strikethrough */,
    [state_1.State.LinkText]: ~19790543 /* Inline */ | 640 /* Link */,
    [state_1.State.ReferingUrl]: ~15 /* Text */,
    [state_1.State.ImageText]: ~19790543 /* Inline */ | 786432 /* Image */,
    [state_1.State.ImageReferingUrl]: ~15 /* Text */,
    [state_1.State.ReferenceLinkUrl]: ~15 /* Text */,
    [state_1.State.HTMLTag]: ~15 /* Text */,
    [state_1.State.ReferingID]: ~15 /* Text */,
    [state_1.State.BlockCodeLang]: ~15 /* Text */,
    [state_1.State.OrderedListItem]: -19790544 /* Block */,
    [state_1.State.UnorderedListItem]: -19790544 /* Block */,
    [state_1.State.Init]: 0 /* None */
};