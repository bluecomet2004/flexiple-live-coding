import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const MAX_LATENCY_IN_MILLIS = 2000;

// Part of data was generated with Faker.js ( https://github.com/marak/Faker.js/ )
/**
 * ConferenceTalkDetails[]
 */
const talksData = [
    {
        id: "84c9927f-231b-45c6-9d34-f395f13ade29",
        title: "Make Tests Green Again",
        speaker: "Celestino Rempel",
        category: "testing",
        description: `Deserunt rem voluptate consequuntur culpa praesentium animi aliquid fugit laboriosam. Et natus culpa eos possimus itaque. Perspiciatis est non.
Incidunt velit rerum officiis omnis voluptatem aliquid sunt voluptas. Amet enim ea dolorem dignissimos odio. Maxime officiis nisi sint iusto sint. Nobis rerum sed et quidem impedit optio rem quam. Quia placeat quis dolorum perferendis qui.
Ducimus et placeat tenetur. Minima numquam qui inventore. Praesentium est animi enim odio maxime.`,
    },
    {
        id: "a0b50f0d-8fb1-40de-840a-d3d7a0114568",
        title: "Render props in examples",
        speaker: "Fletcher McDermott",
        category: "react",
        description: `Esse repudiandae id. Ad reprehenderit consequuntur eius ipsam sint non nihil qui similique. Non harum aut ut suscipit esse et quae quam.
Quidem repellat dolore voluptatem. Perspiciatis commodi ea. Placeat sed rerum aut rem quam reprehenderit qui. Cupiditate labore tenetur dolorem ratione et consequatur. Et harum iure vel vitae quisquam veniam. Sunt doloremque voluptatem totam.
Asperiores voluptatibus rerum et. Repellat et eveniet aut et et ea vitae excepturi. Est quibusdam et. Fugiat sed nihil et. Mollitia corrupti est itaque autem et dicta magnam quia. Excepturi odit tenetur veniam non doloribus et nesciunt pariatur modi.`,
    },
    {
        id: "f704e830-583b-4bbe-83f9-6b5874daefd1",
        title: "Angular stuff",
        speaker: "Khalil Hirthe",
        category: "frameworks",
        description: `Harum consequatur a non enim non provident incidunt reprehenderit assumenda. Architecto enim voluptates dolores quae recusandae. Quae dolorem itaque excepturi ab a fugiat voluptatem. Ut sit est dicta illum ea id aspernatur.
Sit sed magni praesentium. Ut consequatur id quas voluptas sint enim cumque non. Temporibus omnis sit placeat expedita rerum impedit omnis.
Soluta ullam molestiae excepturi dicta ex laboriosam. Similique ut molestias. Ex accusamus asperiores dolor nisi dignissimos architecto.`,
    },
    {
        id: "c71777cf-3c2c-4d8f-a0b0-4418997e813d",
        title: "Hello, Vue!",
        speaker: "Felton Altenwerth",
        category: "frameworks",
        description: `Fuga odit eius sunt. Dignissimos sit rerum voluptatem neque velit. Minus cumque qui doloribus ipsum et quaerat magni perferendis dolorem.
Quis sint nobis. Qui et voluptatibus qui in autem quia dolorum quam error. Sed qui vero sit dolor harum enim voluptates. Aliquid excepturi ipsa a eius aut qui ratione doloribus. In harum neque earum nihil.
Neque voluptatibus omnis quidem aut. Commodi autem est fugit architecto aut laborum velit rerum et. Aut quaerat id sint. Numquam ut enim voluptatibus molestias laboriosam quia magni ex. Rem omnis rem voluptas. Adipisci rerum libero doloribus debitis aut voluptatem ut.`,
    },
    {
        id: "7a908351-c2ee-4901-bdba-f0a9c5cb99e1",
        title: "Lessons learned from Redux Form",
        speaker: "Julius Doyle",
        category: "react",
        description: `A incidunt quasi aut eveniet repudiandae quia occaecati suscipit ex. Accusamus aliquam qui et. Voluptate molestias amet provident laborum quos nihil et perferendis perferendis. Est quidem vitae voluptas magni eos. Omnis mollitia fugiat eos qui accusantium expedita.
Non deserunt quae iure illum sit aut culpa et eaque. Non itaque illum aut at fugiat officiis in et beatae. Minus et modi. Dolores reprehenderit velit nihil animi qui aperiam. Qui aperiam autem voluptas blanditiis maxime necessitatibus minus repudiandae. Consequuntur eum in laborum adipisci.
Sunt mollitia dignissimos consectetur dolorem perspiciatis vero quam nulla. Omnis eveniet numquam illum quam et placeat rem. Sunt aliquam illo eos dolorem molestiae. Vel molestiae laboriosam ea quaerat dolorem cumque dolores. Nihil est quidem quia quas dolores.`,
    },
];

/**
 * CallForPapers
 */
let callForPapersData = {
    byTalkId: {
        "84c9927f-231b-45c6-9d34-f395f13ade29": { status: "pending" },
        "a0b50f0d-8fb1-40de-840a-d3d7a0114568": { status: "accepted" },
        "f704e830-583b-4bbe-83f9-6b5874daefd1": { status: "rejected" },
        "c71777cf-3c2c-4d8f-a0b0-4418997e813d": { status: "pending" },
        "7a908351-c2ee-4901-bdba-f0a9c5cb99e1": { status: "pending" },
    },
};

const fakeResponse = (status, data) => {
    const latency = Math.round(Math.random() * MAX_LATENCY_IN_MILLIS);
    return new Promise(resolve =>
        setTimeout(
            () => resolve([status, data]),
            latency,
        ));
};

export const setupFakeHTTP =
    () => {
        const httpMock = new AxiosMockAdapter(axios);

        httpMock
            .onGet("/talks")
            .reply(() => {
                const basicTalksData = talksData.map(talk => ({
                    id: talk.id,
                    title: talk.title,
                    speaker: talk.speaker,
                    category: talk.category,
                }));
                return fakeResponse(200, basicTalksData);
            });

        httpMock
            .onGet(/^\/talks\/.+/)
            .reply(({ url }) => {
                const talkId = /^\/talks\/(.+)/.exec(url)[1];
                const talkData = talksData.find(talk => talk.id === talkId);
                if (!talkData) {
                    return fakeResponse(404);
                }
                return fakeResponse(204, talkData);
            });

        httpMock
            .onGet("/callForPapers")
            .reply(() => fakeResponse(200, callForPapersData));

        httpMock
            .onPut(/^\/callForPapers\/.+/)
            .reply((config) => {
                const talkId = /^\/callForPapers\/(.+)/.exec(config.url)[1];
                callForPapersData = {
                    byTalkId: {
                        ...callForPapersData.byTalkId,
                        [talkId]: {
                            ...callForPapersData.byTalkId[talkId],
                            status: JSON.parse(config.data).status,
                        },
                    },
                };
                return fakeResponse(204);
            });
    };
