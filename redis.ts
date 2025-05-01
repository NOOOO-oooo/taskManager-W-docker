import Redis from "ioredis";
console.log({
    port:process.env.REDIS_PORT
})

const redis= new Redis({
    host: 'redis',
    port: Number(process.env.REDIS_PORT)
})

redis.on("connect",()=>{
    console.log("redis is connected")
})

redis.on("error",(err)=>{
    console.log(`error: ${err}`)
})

export default redis;