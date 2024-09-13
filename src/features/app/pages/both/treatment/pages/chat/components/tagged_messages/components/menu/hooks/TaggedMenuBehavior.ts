import { Menu } from "@hooks/menu/Menu";
import { TaggedMenuOptionNames, TaggedMenuOptionDetails } from "./TaggedMenuOptions";
import useTaggedMenuActions from "./TaggedMenuActions";

const useTaggedMenuBehavior = () => {
    const taggedMenuActions = useTaggedMenuActions();

    const taggedMenu = new Menu(TaggedMenuOptionDetails);
    taggedMenu.addOption(TaggedMenuOptionNames.UNMARK_ALL, taggedMenuActions.handleUnmarkAll);

    return { options: taggedMenu.getOptions() };
}

export default useTaggedMenuBehavior;