// RotatableSquare.js
import * as THREE from 'three';

export class RotatableSquare {
    constructor(scene, size = 2, color = 0x00ff00) {
        this.size = size;
        this.scene = scene;
        const geometry = new THREE.PlaneGeometry(size, size);
        const material = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide,
        });
        this.mesh = new THREE.Mesh(geometry, material);
        // Place the square at the origin.
        this.mesh.position.set(0, 0, 0);
        scene.add(this.mesh);

        // Variables to manage smooth animation.
        this.isAnimating = false;
        this.animationAxis = new THREE.Vector3();
        this.animationPivot = null;
        this.remainingAngle = 0;
        this.rotationSpeed = 0.02; // radians per frame (adjust as needed)
    }

    /**
     * Starts a smooth rotation about one of its edges.
     * @param {string} edge - "top", "bottom", "left", or "right"
     * @param {number} totalAngle - Total rotation angle in radians (default is Math.PI for a 180° flip)
     */
    startRotation(edge, totalAngle = Math.PI) {
        if (this.isAnimating) return; // prevent overlapping animations

        // Create a pivot group at the edge.
        const pivot = new THREE.Group();
        let pivotOffset = new THREE.Vector3();
        switch (edge) {
            case 'top':
                pivotOffset.set(0, this.size / 2, 0);
                break;
            case 'bottom':
                pivotOffset.set(0, -this.size / 2, 0);
                break;
            case 'left':
                pivotOffset.set(-this.size / 2, 0, 0);
                break;
            case 'right':
                pivotOffset.set(this.size / 2, 0, 0);
                break;
            default:
                console.warn("Invalid edge. Use 'top', 'bottom', 'left', or 'right'.");
                return;
        }

        // Set up the pivot.
        pivot.position.copy(this.mesh.position).add(pivotOffset);
        this.scene.add(pivot);
        this.mesh.position.sub(pivot.position);
        pivot.add(this.mesh);

        // Determine the rotation axis.
        let axis = new THREE.Vector3();
        if (edge === 'top' || edge === 'bottom') {
            axis.set(1, 0, 0);
        } else if (edge === 'left' || edge === 'right') {
            axis.set(0, 1, 0);
        }

        // Save animation state.
        this.isAnimating = true;
        this.animationPivot = pivot;
        this.animationAxis = axis;
        this.remainingAngle = totalAngle;
    }

    /**
     * Call this on every frame to update the rotation if an animation is in progress.
     */
    update() {
        if (!this.isAnimating) return;

        // Determine the incremental angle.
        const deltaAngle = Math.min(this.rotationSpeed, this.remainingAngle);

        // Rotate the pivot.
        this.animationPivot.rotateOnAxis(this.animationAxis, deltaAngle);
        this.remainingAngle -= deltaAngle;

        // If the rotation is complete, finalize the transformation.
        if (this.remainingAngle <= 0) {
            // Convert the mesh's position back to world coordinates.
            this.mesh.position.applyMatrix4(this.animationPivot.matrixWorld);
            this.animationPivot.remove(this.mesh);
            this.scene.add(this.mesh);
            this.scene.remove(this.animationPivot);

            // Reset animation state.
            this.isAnimating = false;
            this.animationPivot = null;
        }
    }
}
