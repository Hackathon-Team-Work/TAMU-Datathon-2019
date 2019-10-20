<template>
    <div class="container" id="app">
        <div class="">
<!--            <div>-->
<!--                <h1>Taco 'Bout It</h1>-->
<!--            </div>-->
            <div>
                <div class="map" id="map"></div>
            </div>
            <div id="filters" >
                <label>Filters: </label>
                <div
                        class="form-check"
                        v-for="layer of getStoredLayers"
                        :key="layer.id"
                >
                    <label class="form-check-label">
                        <input
                                class="form-check-input"
                                type="checkbox"
                                v-model="layer.active"
                                @change="layerChanged(layer.id, layer.active)"
                        />
                        {{ layer.name }}
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "MapView",
        props: ['map'],
        methods: {
            layerChanged(layerId, active) {
                const layer = this.$store.state.layers.find(layer => layer.id === layerId);

                layer.features.forEach(function (feature) {
                    if (active) {
                        feature.leafletObject.addTo(this.map);
                    } else {
                        feature.leafletObject.removeFrom(this.map);
                    }
                }, this);
            }
        },
        computed: {
            getStoredLayers: function() {
                return this.$store.state.layers;
            }
        }
    }
</script>

<style scoped>
#filters {
    border: 2px solid blue;
    border-radius: 1em;
    padding: 1em;
    margin-top: 1em;
    margin-left: 30em;
    width: 15em;
}
#map {
    height: 40em;
    width: 100em;
}
</style>
