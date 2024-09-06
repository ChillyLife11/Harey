import { ref } from "vue";
import { generateRandomString } from "@/utils/helpers.js";

const NOTIFICATION_DURATION = 4000;

const contents = ref([]);

/*(
* notification - { type: string, title: string, icon: string }
* */
function notify(notification) {
    const id = generateRandomString();

    contents.value.push({ id, ...notification });

    setTimeout(() => {
        removeNotification(id)
    }, NOTIFICATION_DURATION);
}

function removeNotification(id) {
    const index = contents.value.indexOf(contents.value.find(c=>c.id===id));

    contents.value.splice(index, 1);
}

export function useNotifications() {

    return {
        notify,
        removeNotification,

        contents
    }
}