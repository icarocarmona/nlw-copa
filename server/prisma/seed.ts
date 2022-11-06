import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            avatarUrl: 'https://github.com/icarocarmona.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Bolao da Firma',
            code: 'FIRMA1',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }

        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-06T12:00:09.092Z',
            fisrtTeamCountryCode: 'BR',
            secondTeamCountryCode: 'DE',

        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-07T11:00:09.092Z',
            fisrtTeamCountryCode: 'AR',
            secondTeamCountryCode: 'BR',

            guesses: {
                create: {
                    firstTeamPoints: 1,
                    secoundTeamPoints: 2,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }
            }
        }
    })
}

main()