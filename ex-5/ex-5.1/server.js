const express = require("express");
const bodyParser = require("body-parser");
const convert = require("xml-js");
const { response } = require("express");

const app = express();
app.use(bodyParser.json());

var tvshowLastId = 1;
var episodeLastId = {
    1: 1,
    2: 1,
};
const tvshows = [
    {
        id: tvshowLastId++,
        name: 'The Flash',
    },
    {
        id: tvshowLastId++,
        name: 'Supergirl',
    },
];
const episodes = [
    {
        id: episodeLastId[1]++,
        tvshow_id: 1,
        title: 'First episode',
    },
    {
        id: episodeLastId[1]++,
        tvshow_id: 1,
        title: 'Second episode',
    },
    {
        id: episodeLastId[2]++,
        tvshow_id: 2,
        title: 'First episode',
    },
];

function responseType(req) {
    return req.accepts('xml') && !req.accepts('json') ? 'xml' : 'json';
}

function formatBody(req, json, xmlJs) {
    if (req.accepts('xml') && !req.accepts('json')) {
        return convert.json2xml(xmlJs, { compact: true });
    } else {
        return json;
    }
}

app.get("/tvshows/", (req, res) => {
    const links = tvshow => [
        {
            href: `/tvshows/${tvshow.id}/episodes/`,
            rel: "episodes",
            type: "GET",
        },
    ];
    const json = tvshows.map(tvshow => ({
        ...tvshow,
        links: links(tvshow),
    }));
    const xmlJs = { tvshows: { tvshow: tvshows.map(tvshow => ({
        ...tvshow,
        links: { link: links(tvshow) },
    })),},};
    const body = formatBody(
        req,
        json,
        xmlJs,
    );
    res.setHeader('content-type', `application/${responseType(req)}`);
    res.status(200).send(body);
});

app.get("/tvshows/:tvshow/episodes/", (req, res) => {
    const tvshowId = +req.params.tvshow;
    const tvshowEpisodes = episodes.filter(episode => episode.tvshow_id == tvshowId);
    const links = episode => [
        {
            href: `/tvshows/${tvshowId}/episodes/${episode.id}/`,
            rel: "self",
            type: "GET",
        },
        {
            href: `/tvshows/`,
            rel: "tvshows",
            type: "GET",
        },
    ];
    const json = tvshowEpisodes.map(episode => ({
        ...episode,
        links: links(episode),
    }));
    const xmlJs = { episodes: { episode: tvshowEpisodes.map(episode => ({
        ...episode,
        links: { link: links(episode) },
    }))}};
    const body = formatBody(
        req,
        json,
        xmlJs
    );
    res.setHeader('content-type', `application/${responseType(req)}`);
    res.status(200).send(body);
});

app.get("/tvshows/:tvshow/episodes/:episode/", (req, res) => {
    const tvshowId = +req.params.tvshow;
    const episodeId = +req.params.episode;
    const episodeJson =
        episodes
            .filter(episode => episode.tvshow_id === tvshowId)
            .find(episode => episode.id === episodeId);
    const links = [
        {
            href: `/tvshows/${tvshowId}/episodes/${episodeId}/`,
            rel: "self",
            type: "GET",
        },
        {
            href: `/tvshows/`,
            rel: "tvshows",
            type: "GET",
        },
    ];
    const json = {
        ...episodeJson,
        links,
    }
    const xmlJs = { episode: {
        ...episodeJson,
        links: { link: links },
    }};
    const body = formatBody(
        req,
        json,
        xmlJs,
    );
    res.setHeader('content-type', `application/${responseType(req)}`);
    res.status(200).send(body);
});

app.post("/tvshows/:tvshow/episodes/", (req, res) => {
    const tvshowId = req.params.tvshow;
    const episodeId = episodeLastId[tvshowId]++;
    const episode = {
        id: episodeId,
        tvshow_id: tvshowId,
        ...req.body,
    }
    episodes.push(episode);

    const json = {
        id: episode.id,
    };
    res.location(`/tvshows/${tvshowId}/episodes/${episodeId}/`);
    res.setHeader('content-type', `application/${responseType(req)}`);
    res.status(201).send(formatBody(req, json, {
        episode: json,
    }));
});

app.put("/tvshows/:tvshow/episodes/", (req, res) => {
    const tvshowId = req.params.tvshow;
    const newEpisode = {
        ...req.body,
    }
    const idx = episodes.findIndex(episode => 
        newEpisode.id === episode.id
        && newEpisode.tvshow_id === tvshowId
    );
    if (idx === -1) {
        res.status(404);
        return;
    }
    episodes[idx].title = newEpisode.title;

    const json = {
        id: newEpisode.id,
    };
    res.location(`/tvshows/${tvshowId}/episodes/${newEpisode.id}/`);
    res.setHeader('content-type', `application/${responseType(req)}`);
    res.status(201).send(formatBody(req, json, {
        episode: json,
    }));
});

app.delete("/tvshows/:tvshow/episodes/:episode/", (req, res) => {
    const tvshowId = +req.params.tvshow;
    const episodeId = +req.params.episode;
    const idx = episodes.findIndex(episode => 
        episode.id === episodeId
        && episode.tvshow_id === tvshowId
    );
    console.log(tvshowId, episodeId, idx);
    if (idx === -1) {
        res.status(404).send();
        return;
    }
    episodes.splice(idx, 1);
    res.status(204).send();
});

app.listen(3000, () => console.log("server running"));
