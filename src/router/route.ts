import express from 'express';

import * as control from "../controller/tasks"
const router= express.Router();

router.post('/create',control.createTask)
router.get("/one/:id",control.getTask)
router.get("/all",control.allTasks)
router.delete("/delete/:id",control.deleteTask)
router.get("/allpending",control.pendingTasks)
router.put('/edit/:id',control.changeDesc)
router.put('/progress/:id',control.inProgress)
router.put('/done/:id',control.done)
router.get("/allInProgress",control.progressTasks)
router.get("/allDone",control.doneTasks)

export default router;