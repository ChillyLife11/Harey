export default {
    mounted() {
        this.addClassToClickableElements(this.$el);
    },
    methods: {
        addClassToClickableElements(el) {
            /*if (!el) return;

            const hasClickListener = !!(el.__vueClickListeners__ || (el.__vnode && el.__vnode.props && el.__vnode.props.onClick));

            if (hasClickListener) el.classList.add("has-click-listener");*/
        }
    }
};